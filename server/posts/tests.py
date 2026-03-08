from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from datetime import date, timedelta
from .models import Post, Like, Comment, Follow, Save, Collection
import tempfile
from PIL import Image

User = get_user_model()

class PostModelTests(TestCase):
    """Test the Post model"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            full_name='Test User',
            date_of_birth=date.today() - timedelta(days=365*20),
            phone_number='+233123456789',
            country='GH',
            city='Accra'
        )
    
    def test_create_post(self):
        post = Post.objects.create(
            user=self.user,
            caption='Test post',
            post_type='image'
        )
        
        self.assertEqual(post.user, self.user)
        self.assertEqual(post.caption, 'Test post')
        self.assertEqual(post.likes_count, 0)
        self.assertEqual(post.comments_count, 0)
    
    def test_increment_likes(self):
        post = Post.objects.create(user=self.user, caption='Test post')
        post.increment_likes()
        self.assertEqual(post.likes_count, 1)
    
    def test_decrement_likes(self):
        post = Post.objects.create(user=self.user, caption='Test post')
        post.likes_count = 5
        post.save()
        post.decrement_likes()
        self.assertEqual(post.likes_count, 4)


class PostAPITests(APITestCase):
    """Test Post API endpoints"""
    
    def setUp(self):
        self.client = APIClient()
        
        # Create users
        self.user1 = User.objects.create_user(
            username='user1',
            email='user1@example.com',
            password='testpass123',
            full_name='User One',
            date_of_birth=date.today() - timedelta(days=365*20),
            phone_number='+233123456780',
            country='GH',
            city='Accra'
        )
        
        self.user2 = User.objects.create_user(
            username='user2',
            email='user2@example.com',
            password='testpass123',
            full_name='User Two',
            date_of_birth=date.today() - timedelta(days=365*20),
            phone_number='+233123456781',
            country='GH',
            city='Kumasi'
        )
        
        # Authenticate as user1
        self.client.force_authenticate(user=self.user1)
        
        # Create a test image
        self.image = tempfile.NamedTemporaryFile(suffix='.jpg').name
        Image.new('RGB', (100, 100)).save(self.image)
    
    def test_create_post(self):
        url = reverse('post-list')
        data = {
            'caption': 'Test post',
            'post_type': 'image',
            'visibility': 'public'
        }
        
        with open(self.image, 'rb') as img:
            data['media_file'] = img
            response = self.client.post(url, data, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.first().user, self.user1)
    
    def test_like_post(self):
        # Create a post
        post = Post.objects.create(user=self.user2, caption='Test post')
        
        url = reverse('post-like', kwargs={'pk': post.id})
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'liked')
        self.assertEqual(Like.objects.count(), 1)
        
        # Unlike
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'unliked')
        self.assertEqual(Like.objects.count(), 0)
    
    def test_comment_on_post(self):
        # Create a post
        post = Post.objects.create(user=self.user2, caption='Test post')
        
        url = reverse('post-comment', kwargs={'pk': post.id})
        data = {'content': 'Great post!'}
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)
        self.assertEqual(Comment.objects.first().content, 'Great post!')
        
        # Check that post comment count increased
        post.refresh_from_db()
        self.assertEqual(post.comments_count, 1)
    
    def test_feed(self):
        # Create posts from user2 (not followed yet)
        post1 = Post.objects.create(user=self.user2, caption='Post 1')
        post2 = Post.objects.create(user=self.user2, caption='Post 2')
        
        # Create a public post from another user
        url = reverse('feed')
        response = self.client.get(url)
        
        # Should only see public posts since not following anyone
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    
    def test_follow_user(self):
        url = reverse('follow', kwargs={'username': self.user2.username})
        
        # Follow
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Follow.objects.count(), 1)
        
        # Check following status
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['is_following'])
        
        # Unfollow
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Follow.objects.count(), 0)
    
    def test_create_collection(self):
        url = reverse('collection-list')
        data = {
            'name': 'My Collection',
            'description': 'Test collection',
            'visibility': 'private'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Collection.objects.count(), 1)
        self.assertEqual(Collection.objects.first().user, self.user1)
    
    def test_save_post(self):
        # Create a post
        post = Post.objects.create(user=self.user2, caption='Test post')
        
        # Create a collection
        collection = Collection.objects.create(
            user=self.user1,
            name='My Collection'
        )
        
        url = reverse('post-save', kwargs={'pk': post.id})
        data = {'collection_id': collection.id}
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Save.objects.count(), 1)
        
        # Check post save count increased
        post.refresh_from_db()
        self.assertEqual(post.saves_count, 1)
        
        # Unsave
        unsave_url = reverse('post-unsave', kwargs={'pk': post.id})
        response = self.client.delete(unsave_url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Save.objects.count(), 0)
        
        post.refresh_from_db()
        self.assertEqual(post.saves_count, 0)
    
    def test_explore_feed(self):
        # Create multiple posts from different users
        for i in range(5):
            Post.objects.create(
                user=self.user2,
                caption=f'Post {i}',
                visibility='public'
            )
        
        url = reverse('explore')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)