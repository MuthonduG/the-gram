# The Gram API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication

All endpoints except registration and login require authentication. Include session cookie or token in requests.

---

## OAuth App Endpoints (`/api/auth/`)

### 1. User Registration
**Endpoint:** `POST /api/auth/register/`

**Request Body:**
```json
{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "confirm_password": "SecurePass123!",
    "full_name": "John Doe",
    "date_of_birth": "2000-01-01",
    "phone_number": "+233123456789",
    "country": "GH",
    "city": "Accra"
}
```

**Success Response (201 Created):**
```json
{
    "success": true,
    "message": "Registration successful",
    "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "john@example.com",
        "bio": "",
        "profile_picture": null,
        "profile_picture_url": "/static/default_profile.png",
        "cover_photo": null,
        "cover_photo_url": "/static/default_cover.jpg",
        "phone_number": "+233123456789",
        "country": "GH",
        "city": "Accra",
        "date_of_birth": "2000-01-01",
        "age": 24,
        "is_age_verified": true,
        "is_verified": false,
        "date_joined": "2024-01-15 10:30:00"
    }
}
```

**Error Response (400 Bad Request):**
```json
{
    "success": false,
    "errors": {
        "username": ["A user with that username already exists."],
        "email": ["Enter a valid email address."]
    }
}
```

---

### 2. User Login
**Endpoint:** `POST /api/auth/login/`

**Request Body (username):**
```json
{
    "username": "johndoe",
    "password": "SecurePass123!"
}
```

**Request Body (email):**
```json
{
    "email": "john@example.com",
    "password": "SecurePass123!"
}
```

**Request Body (phone):**
```json
{
    "phone_number": "+233123456789",
    "password": "SecurePass123!"
}
```

**Success Response (200 OK):**
```json
{
    "success": true,
    "message": "Login successful",
    "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "john@example.com",
        "bio": "",
        "profile_picture_url": "/static/default_profile.png",
        "cover_photo_url": "/static/default_cover.jpg",
        "phone_number": "+233123456789",
        "country": "GH",
        "city": "Accra",
        "date_of_birth": "2000-01-01",
        "age": 24,
        "is_age_verified": true,
        "is_verified": false,
        "date_joined": "2024-01-15 10:30:00"
    }
}
```

**Error Response (400 Bad Request):**
```json
{
    "success": false,
    "errors": {
        "non_field_errors": ["Unable to log in with provided credentials"]
    }
}
```

---

### 3. User Logout
**Endpoint:** `POST /api/auth/logout/`

**Headers:** `Authorization: Session <session_id>` or authenticated session

**Success Response (200 OK):**
```json
{
    "success": true,
    "message": "Logout successful"
}
```

---

### 4. Get Current User Profile
**Endpoint:** `GET /api/auth/profile/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
{
    "success": true,
    "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "john@example.com",
        "bio": "Photographer & Traveler",
        "profile_picture": null,
        "profile_picture_url": "/media/profile_pics/john_20240115.jpg",
        "cover_photo": null,
        "cover_photo_url": "/media/cover_photos/john_cover.jpg",
        "phone_number": "+233123456789",
        "country": "GH",
        "city": "Accra",
        "date_of_birth": "2000-01-01",
        "age": 24,
        "is_age_verified": true,
        "is_verified": false,
        "date_joined": "2024-01-15 10:30:00"
    }
}
```

---

### 5. Update User Profile
**Endpoint:** `PATCH /api/auth/profile/`

**Headers:** `Authorization: Session <session_id>`
**Content-Type:** `multipart/form-data`

**Request Body:**
```json
{
    "full_name": "John Updated Doe",
    "bio": "Professional photographer based in Accra",
    "city": "Kumasi"
}
```

**With File Upload:**
```
POST /api/auth/profile/
Content-Type: multipart/form-data

full_name=John Doe
bio=New bio text
profile_picture=@/path/to/image.jpg
cover_photo=@/path/to/cover.jpg
```

**Success Response (200 OK):**
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Updated Doe",
        "bio": "Professional photographer based in Accra",
        "profile_picture_url": "/media/profile_pics/updated_20240115.jpg",
        "cover_photo_url": "/media/cover_photos/updated_cover.jpg",
        "city": "Kumasi"
    }
}
```

---

### 6. Get User Profile by Username
**Endpoint:** `GET /api/auth/profile/{username}/`

**Example:** `GET /api/auth/profile/johndoe/`

**Success Response (200 OK):**
```json
{
    "success": true,
    "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "bio": "Photographer & Traveler",
        "profile_picture_url": "/media/profile_pics/john.jpg",
        "cover_photo_url": "/media/cover_photos/john_cover.jpg",
        "country": "GH",
        "city": "Accra",
        "age": 24,
        "is_verified": false,
        "date_joined": "2024-01-15 10:30:00"
    }
}
```

**Error Response (404 Not Found):**
```json
{
    "success": false,
    "message": "User not found"
}
```

---

### 7. Change Password
**Endpoint:** `POST /api/auth/change-password/`

**Headers:** `Authorization: Session <session_id>`

**Request Body:**
```json
{
    "old_password": "OldPass123!",
    "new_password": "NewSecurePass123!",
    "confirm_new_password": "NewSecurePass123!"
}
```

**Success Response (200 OK):**
```json
{
    "success": true,
    "message": "Password changed successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
    "success": false,
    "errors": {
        "old_password": ["Old password is incorrect"],
        "confirm_new_password": ["New passwords don't match"]
    }
}
```

---

### 8. Check Username Availability
**Endpoint:** `POST /api/auth/check-username/`

**Request Body:**
```json
{
    "username": "newuser123"
}
```

**Success Response (200 OK):**
```json
{
    "success": true,
    "available": true,
    "message": "Username is available"
}
```

**Response when taken:**
```json
{
    "success": true,
    "available": false,
    "message": "Username is taken"
}
```

---

### 9. Check Email Availability
**Endpoint:** `POST /api/auth/check-email/`

**Request Body:**
```json
{
    "email": "newuser@example.com"
}
```

**Success Response (200 OK):**
```json
{
    "success": true,
    "available": true,
    "message": "Email is available"
}
```

---

## Posts App Endpoints (`/api/`)

### 10. Create Post
**Endpoint:** `POST /api/posts/`

**Headers:** `Authorization: Session <session_id>`
**Content-Type:** `multipart/form-data`

**Request Body (Image/Video):**
```
POST /api/posts/
Content-Type: multipart/form-data

post_type=image
caption=Beautiful sunset in Accra
media_file=@/path/to/sunset.jpg
visibility=public
location_name=Labadi Beach
location_country=GH
location_city=Accra
allow_comments=true
```

**Request Body (Carousel):**
```
POST /api/posts/
Content-Type: multipart/form-data

post_type=carousel
caption=My travel album
carousel_images=@/path/to/img1.jpg
carousel_images=@/path/to/img2.jpg
carousel_images=@/path/to/img3.jpg
visibility=public
```

**Success Response (201 Created):**
```json
{
    "id": 101,
    "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "profile_picture_url": "/media/profile_pics/john.jpg"
    },
    "post_type": "image",
    "caption": "Beautiful sunset in Accra",
    "media_url": "/media/posts/2024/01/15/sunset.jpg",
    "thumbnail_url": "/media/thumbnails/2024/01/15/sunset_thumb.jpg",
    "is_carousel": false,
    "carousel_images": [],
    "location_name": "Labadi Beach",
    "location_country": "GH",
    "location_city": "Accra",
    "likes_count": 0,
    "comments_count": 0,
    "saves_count": 0,
    "shares_count": 0,
    "visibility": "public",
    "allow_comments": true,
    "allow_sharing": true,
    "created_at": "2024-01-15 14:30:00",
    "is_liked": false,
    "is_saved": false,
    "is_following": null
}
```

---

### 11. Get Feed
**Endpoint:** `GET /api/feed/`

**Headers:** `Authorization: Session <session_id>`
**Query Params:** `?page=1`

**Success Response (200 OK):**
```json
{
    "count": 50,
    "next": "http://localhost:8000/api/feed/?page=2",
    "previous": null,
    "results": [
        {
            "id": 101,
            "user": {
                "id": 2,
                "username": "janedoe",
                "full_name": "Jane Doe",
                "profile_picture_url": "/media/profile_pics/jane.jpg"
            },
            "post_type": "image",
            "caption": "Exploring the city",
            "media_url": "/media/posts/2024/01/15/city.jpg",
            "thumbnail_url": "/media/thumbnails/2024/01/15/city_thumb.jpg",
            "likes_count": 42,
            "comments_count": 7,
            "created_at": "2024-01-15 13:00:00",
            "is_liked": false,
            "is_saved": true,
            "is_following": true
        }
    ]
}
```

---

### 12. Get Explore Feed
**Endpoint:** `GET /api/explore/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 201,
        "user": {
            "id": 5,
            "username": "travel_photographer",
            "full_name": "Travel Pro",
            "profile_picture_url": "/media/profile_pics/travel.jpg"
        },
        "post_type": "image",
        "caption": "Amazing view from Kilimanjaro",
        "media_url": "/media/posts/2024/01/15/kili.jpg",
        "likes_count": 1234,
        "comments_count": 89,
        "created_at": "2024-01-15 10:00:00",
        "is_liked": false,
        "is_saved": false,
        "is_following": false
    }
]
```

---

### 13. Like/Unlike Post
**Endpoint:** `POST /api/posts/{post_id}/like/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (201 Created - Like):**
```json
{
    "status": "liked",
    "likes_count": 43
}
```

**Success Response (200 OK - Unlike):**
```json
{
    "status": "unliked",
    "likes_count": 42
}
```

---

### 14. Get Post Likes
**Endpoint:** `GET /api/posts/{post_id}/likes/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 3,
        "username": "janedoe",
        "full_name": "Jane Doe",
        "profile_picture_url": "/media/profile_pics/jane.jpg"
    },
    {
        "id": 4,
        "username": "bobsmith",
        "full_name": "Bob Smith",
        "profile_picture_url": "/media/profile_pics/bob.jpg"
    }
]
```

---

### 15. Comment on Post
**Endpoint:** `POST /api/posts/{post_id}/comment/`

**Headers:** `Authorization: Session <session_id>`

**Request Body:**
```json
{
    "content": "Amazing photo! Where was this taken?"
}
```

**Request Body (Reply to comment):**
```json
{
    "content": "Thanks! It was taken in Accra.",
    "parent": 45
}
```

**Success Response (201 Created):**
```json
{
    "id": 456,
    "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "profile_picture_url": "/media/profile_pics/john.jpg"
    },
    "content": "Amazing photo! Where was this taken?",
    "likes_count": 0,
    "replies_count": 0,
    "created_at": "2024-01-15 15:30:00",
    "parent": null,
    "is_liked": false
}
```

---

### 16. Get Post Comments
**Endpoint:** `GET /api/posts/{post_id}/comments/`

**Headers:** `Authorization: Session <session_id>`
**Query Params:** `?page=1`

**Success Response (200 OK):**
```json
{
    "count": 25,
    "next": "http://localhost:8000/api/posts/101/comments/?page=2",
    "previous": null,
    "results": [
        {
            "id": 456,
            "user": {
                "id": 2,
                "username": "janedoe",
                "full_name": "Jane Doe",
                "profile_picture_url": "/media/profile_pics/jane.jpg"
            },
            "content": "Amazing photo! Where was this taken?",
            "likes_count": 5,
            "replies_count": 2,
            "created_at": "2024-01-15 15:30:00",
            "is_liked": true,
            "replies": [
                {
                    "id": 457,
                    "user": {
                        "id": 1,
                        "username": "johndoe",
                        "full_name": "John Doe",
                        "profile_picture_url": "/media/profile_pics/john.jpg"
                    },
                    "content": "Thanks! It's Labadi Beach",
                    "likes_count": 2,
                    "created_at": "2024-01-15 15:35:00",
                    "is_liked": false
                }
            ]
        }
    ]
}
```

---

### 17. Like/Unlike Comment
**Endpoint:** `POST /api/posts/{post_id}/comments/{comment_id}/like/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (201 Created - Like):**
```json
{
    "status": "liked",
    "likes_count": 6
}
```

---

### 18. Get Comment Replies
**Endpoint:** `GET /api/posts/{post_id}/comments/{comment_id}/replies/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 457,
        "user": {
            "id": 1,
            "username": "johndoe",
            "full_name": "John Doe",
            "profile_picture_url": "/media/profile_pics/john.jpg"
        },
        "content": "Thanks! It's Labadi Beach",
        "likes_count": 2,
        "created_at": "2024-01-15 15:35:00",
        "is_liked": false
    }
]
```

---

### 19. Follow/Unfollow User
**Endpoint:** `POST /api/follow/{username}/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (201 Created - Follow):**
```json
{
    "status": "following",
    "message": "You are now following janedoe"
}
```

**Success Response (200 OK - Unfollow):**
```json
{
    "status": "unfollowed",
    "message": "You have unfollowed janedoe"
}
```

**Check Follow Status (GET):**
```json
{
    "is_following": true
}
```

---

### 20. Get User Followers
**Endpoint:** `GET /api/followers/{username}/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 3,
        "username": "janedoe",
        "full_name": "Jane Doe",
        "profile_picture_url": "/media/profile_pics/jane.jpg",
        "bio": "Travel enthusiast"
    }
]
```

---

### 21. Get User Following
**Endpoint:** `GET /api/following/{username}/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 4,
        "username": "bobsmith",
        "full_name": "Bob Smith",
        "profile_picture_url": "/media/profile_pics/bob.jpg",
        "bio": "Photographer"
    }
]
```

---

### 22. Create Collection
**Endpoint:** `POST /api/collections/`

**Headers:** `Authorization: Session <session_id>`

**Request Body:**
```json
{
    "name": "Travel Inspiration",
    "description": "Places I want to visit",
    "visibility": "private"
}
```

**With Cover Image:**
```
POST /api/collections/
Content-Type: multipart/form-data

name=Travel Inspiration
description=Places I want to visit
visibility=private
cover_image=@/path/to/cover.jpg
```

**Success Response (201 Created):**
```json
{
    "id": 5,
    "name": "Travel Inspiration",
    "description": "Places I want to visit",
    "cover_image_url": "/media/collection_covers/2024/01/15/cover.jpg",
    "visibility": "private",
    "posts_count": 0,
    "created_at": "2024-01-15 16:00:00"
}
```

---

### 23. Get User Collections
**Endpoint:** `GET /api/collections/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 5,
        "name": "Travel Inspiration",
        "description": "Places I want to visit",
        "cover_image_url": "/media/collection_covers/2024/01/15/cover.jpg",
        "visibility": "private",
        "posts_count": 3,
        "created_at": "2024-01-15 16:00:00"
    }
]
```

---

### 24. Save Post to Collection
**Endpoint:** `POST /api/posts/{post_id}/save/`

**Headers:** `Authorization: Session <session_id>`

**Request Body:**
```json
{
    "collection_id": 5
}
```

**Success Response (201 Created):**
```json
{
    "id": 78,
    "post": {
        "id": 101,
        "user": {
            "username": "janedoe",
            "full_name": "Jane Doe"
        },
        "caption": "Beautiful sunset",
        "media_url": "/media/posts/sunset.jpg",
        "thumbnail_url": "/media/thumbnails/sunset_thumb.jpg"
    },
    "collection": {
        "id": 5,
        "name": "Travel Inspiration"
    },
    "created_at": "2024-01-15 16:30:00"
}
```

---

### 25. Unsave Post
**Endpoint:** `DELETE /api/posts/{post_id}/unsave/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (204 No Content)**

---

### 26. Get Saved Posts
**Endpoint:** `GET /api/saved/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 101,
        "user": {
            "id": 2,
            "username": "janedoe",
            "full_name": "Jane Doe",
            "profile_picture_url": "/media/profile_pics/jane.jpg"
        },
        "caption": "Beautiful sunset",
        "media_url": "/media/posts/sunset.jpg",
        "likes_count": 42,
        "comments_count": 7,
        "created_at": "2024-01-14 18:00:00"
    }
]
```

---

### 27. Get Collection Posts
**Endpoint:** `GET /api/collections/{collection_id}/posts/`

**Headers:** `Authorization: Session <session_id>`

**Success Response (200 OK):**
```json
[
    {
        "id": 101,
        "user": {
            "username": "janedoe",
            "full_name": "Jane Doe"
        },
        "caption": "Beautiful sunset",
        "media_url": "/media/posts/sunset.jpg",
        "created_at": "2024-01-14 18:00:00"
    }
]
```

---

### 28. Remove Post from Collection
**Endpoint:** `POST /api/collections/{collection_id}/remove_post/`

**Headers:** `Authorization: Session <session_id>`

**Request Body:**
```json
{
    "post_id": 101
}
```

**Success Response (204 No Content)**

---

### 29. Report Post
**Endpoint:** `POST /api/posts/{post_id}/report/`

**Headers:** `Authorization: Session <session_id>`

**Request Body:**
```json
{
    "reason": "harassment",
    "description": "This post contains offensive content"
}
```

**Available Reasons:**
- `spam` - Spam
- `harassment` - Harassment
- `nudity` - Nudity or sexual content
- `violence` - Violence or harmful content
- `hate_speech` - Hate speech
- `copyright` - Copyright infringement
- `other` - Other

**Success Response (201 Created):**
```json
{
    "id": 15,
    "reason": "harassment",
    "description": "This post contains offensive content",
    "created_at": "2024-01-15 17:00:00",
    "status": "pending"
}
```

---

### 30. Report Comment
**Endpoint:** `POST /api/posts/{post_id}/comments/{comment_id}/report/`

**Headers:** `Authorization: Session <session_id>`

**Request Body:**
```json
{
    "reason": "hate_speech",
    "description": "This comment contains hate speech"
}
```

**Success Response (201 Created):**
```json
{
    "id": 16,
    "reason": "hate_speech",
    "description": "This comment contains hate speech",
    "created_at": "2024-01-15 17:05:00",
    "status": "pending"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
    "success": false,
    "errors": {
        "field_name": ["Error message"]
    }
}
```

### 401 Unauthorized
```json
{
    "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
    "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
    "success": false,
    "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
    "detail": "Internal server error"
}
```

---

## Status Codes Summary

| Status Code | Description |
|------------|-------------|
| 200 OK | Request successful |
| 201 Created | Resource created successfully |
| 204 No Content | Request successful, no content returned |
| 400 Bad Request | Invalid request data |
| 401 Unauthorized | Authentication required |
| 403 Forbidden | Permission denied |
| 404 Not Found | Resource not found |
| 500 Internal Server Error | Server error |

---

## Notes

1. All datetime fields are returned in ISO format: `YYYY-MM-DD HH:MM:SS`
2. Pagination is available on list endpoints with `page` query parameter
3. File uploads should use `multipart/form-data` encoding
4. Session authentication is used by default
5. Country codes follow ISO 3166-1 alpha-2 format
6. Phone numbers should include country code (e.g., +233123456789)