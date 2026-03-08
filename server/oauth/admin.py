from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, BlacklistedRegistration

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'full_name', 'country', 'city', 'is_age_verified', 'date_joined')
    list_filter = ('country', 'is_age_verified', 'is_active')
    search_fields = ('username', 'email', 'full_name', 'phone_number')
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {
            'fields': ('full_name', 'email', 'phone_number', 'date_of_birth', 'bio')
        }),
        ('Location', {
            'fields': ('country', 'city')
        }),
        ('Profile Images', {
            'fields': ('profile_picture', 'cover_photo')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Verification', {
            'fields': ('is_age_verified', 'age_verified_at', 'is_verified')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'full_name', 'date_of_birth', 'phone_number', 'country', 'city'),
        }),
    )

@admin.register(BlacklistedRegistration)
class BlacklistedRegistrationAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone_number', 'reason', 'ip_address', 'created_at')
    list_filter = ('reason', 'created_at')
    search_fields = ('email', 'phone_number', 'ip_address')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

admin.site.register(User, CustomUserAdmin)