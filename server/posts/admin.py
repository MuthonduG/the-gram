from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Post, CarouselImage, Like, Comment, CommentLike,
    Follow, Save, Collection, Report
)

class CarouselImageInline(admin.TabularInline):
    model = CarouselImage
    extra = 1

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post_type', 'caption_preview', 'likes_count', 
                   'comments_count', 'visibility', 'created_at')
    list_filter = ('post_type', 'visibility', 'created_at', 'allow_comments')
    search_fields = ('user__username', 'user__email', 'caption')
    readonly_fields = ('likes_count', 'comments_count', 'saves_count', 'shares_count',
                      'created_at', 'updated_at', 'media_preview')
    inlines = [CarouselImageInline]
    raw_id_fields = ('user',)
    
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Content', {
            'fields': ('caption', 'post_type', 'media_file', 'media_preview', 'thumbnail')
        }),
        ('Location', {
            'fields': ('location_name', 'location_country', 'location_city',
                      'location_lat', 'location_lng')
        }),
        ('Settings', {
            'fields': ('visibility', 'allow_comments', 'allow_sharing')
        }),
        ('Statistics', {
            'fields': ('likes_count', 'comments_count', 'saves_count', 'shares_count')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def caption_preview(self, obj):
        return obj.caption[:50] + '...' if len(obj.caption) > 50 else obj.caption
    caption_preview.short_description = 'Caption'
    
    def media_preview(self, obj):
        if obj.media_file:
            if obj.post_type == 'image':
                return format_html('<img src="{}" style="max-height: 100px;"/>', obj.media_file.url)
            else:
                return format_html('<a href="{}">View Media</a>', obj.media_file.url)
        return "No media"
    media_preview.short_description = 'Media Preview'


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'post__caption')
    raw_id_fields = ('user', 'post')
    readonly_fields = ('created_at',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'content_preview', 'likes_count', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'content')
    raw_id_fields = ('user', 'post', 'parent')
    readonly_fields = ('likes_count', 'created_at', 'updated_at')
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('id', 'follower', 'following', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('follower__username', 'following__username')
    raw_id_fields = ('follower', 'following')
    readonly_fields = ('created_at',)


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'visibility', 'posts_count', 'created_at')
    list_filter = ('visibility', 'created_at')
    search_fields = ('user__username', 'name', 'description')
    raw_id_fields = ('user',)
    readonly_fields = ('created_at', 'updated_at')
    
    def posts_count(self, obj):
        return obj.saved_posts.count()
    posts_count.short_description = 'Saved Posts'


@admin.register(Save)
class SaveAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'collection', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'post__caption')
    raw_id_fields = ('user', 'post', 'collection')
    readonly_fields = ('created_at',)


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'reporter', 'target', 'reason', 'status', 'created_at')
    list_filter = ('reason', 'status', 'created_at')
    search_fields = ('reporter__username', 'description')
    raw_id_fields = ('reporter', 'post', 'comment')
    readonly_fields = ('created_at', 'updated_at')
    
    def target(self, obj):
        if obj.post:
            return f"Post: {obj.post.id}"
        elif obj.comment:
            return f"Comment: {obj.comment.id}"
        return "Unknown"
    target.short_description = 'Reported Item'
    
    actions = ['mark_as_reviewed', 'mark_as_resolved', 'dismiss_report']
    
    def mark_as_reviewed(self, request, queryset):
        queryset.update(status='reviewed')
    mark_as_reviewed.short_description = "Mark selected reports as reviewed"
    
    def mark_as_resolved(self, request, queryset):
        queryset.update(status='resolved')
    mark_as_resolved.short_description = "Mark selected reports as resolved"
    
    def dismiss_report(self, request, queryset):
        queryset.update(status='dismissed')
    dismiss_report.short_description = "Dismiss selected reports"