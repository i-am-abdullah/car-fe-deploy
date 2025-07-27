'use client';

import { useState, useEffect } from 'react';
import { Button, Container, Paper, Title, Grid, LoadingOverlay } from '@mantine/core';
import toast from 'react-hot-toast';
import { InputField } from '@/components/Input/Input';
import { get, patch } from '@/utils/api';
import { getAccessToken } from '@/utils/tokenUtils';
import { parseJwt } from '@/utils/jwtUtils';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture_url: string | null;
  role: string;
  is_verified: boolean;
  last_login: string;
}

interface EditableUserData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export default function EditProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<EditableUserData>({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Get user ID from access token
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const response = parseJwt(accessToken);
      if (response && response.sub) {
        setUserId(response.sub);
      } else {
        toast.error('Unable to get user information from token');
        setLoading(false);
      }
    } else {
      toast.error('No access token found');
      setLoading(false);
    }
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const userData = await get<UserProfile>(`/users/${userId}`);
        setUserProfile(userData);
        
        // Set form data with fetched user data
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          password: '', // Always empty for security
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          phone_number: userData.phone_number || '',
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Handle password edit toggle
  const handlePasswordEditToggle = () => {
    if (isEditingPassword) {
      // Cancel editing - clear password field
      setFormData(prev => ({ ...prev, password: '' }));
      setIsEditingPassword(false);
    } else {
      // Start editing - clear password field and enable editing
      setFormData(prev => ({ ...prev, password: '' }));
      setIsEditingPassword(true);
    }
  };

  // Handle form field changes
  const handleFieldChange = (field: keyof EditableUserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle profile update
  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      
      // Validate required fields
      if (!formData.username.trim()) {
        toast.error('Username is required');
        return;
      }
      if (!formData.email.trim()) {
        toast.error('Email is required');
        return;
      }
      if (!formData.first_name.trim()) {
        toast.error('First name is required');
        return;
      }
      if (!formData.last_name.trim()) {
        toast.error('Last name is required');
        return;
      }

      // Validate password if editing
      if (isEditingPassword && !formData.password.trim()) {
        toast.error('Password is required when editing password');
        return;
      }

      // Create update payload
      const updatePayload: any = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone_number: formData.phone_number.trim(),
      };

      // Only include password if it's being edited
      if (isEditingPassword && formData.password.trim()) {
        updatePayload.password = formData.password.trim();
      }

      await patch('/users/update', { data: updatePayload });
      
      toast.success('Profile updated successfully!');
      
      // Reset password editing state
      setIsEditingPassword(false);
      setFormData(prev => ({ ...prev, password: '' }));
      
      // Optionally refresh the user data
      if (userId) {
        const updatedUserData = await get<UserProfile>(`/users/${userId}`);
        setUserProfile(updatedUserData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle form reset
  const handleResetForm = () => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        email: userProfile.email || '',
        password: '', // Always empty for security
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone_number: userProfile.phone_number || '',
      });
      setIsEditingPassword(false);
      toast.success('Form reset to original values');
    }
  };

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" pos="relative">
          <LoadingOverlay visible={loading} />
          <Title order={2} mb="lg">Loading Profile...</Title>
        </Paper>
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl">
          <Title order={2} mb="lg" c="red">Error Loading Profile</Title>
          <p>Unable to load user profile. Please try again later.</p>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Paper shadow="sm" p="xl" pos="relative">
        <LoadingOverlay visible={saving} />
        
        <Title order={2} mb="lg">Edit Profile</Title>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <InputField
                label="Username"
                placeholder="Enter username"
                value={formData.username}
                onChange={(val:any) => handleFieldChange('username', val)}
                required
              />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <InputField
                type="email"
                label="Email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(val:any) => handleFieldChange('email', val)}
                required
              />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <InputField
                label="First Name"
                placeholder="Enter first name"
                value={formData.first_name}
                onChange={(val:any) => handleFieldChange('first_name', val)}
                required
              />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <InputField
                label="Last Name"
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={(val:any) => handleFieldChange('last_name', val)}
                required
              />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <InputField
                label="Phone Number"
                placeholder="Enter phone number"
                value={formData.phone_number}
                onChange={(val:any) => handleFieldChange('phone_number', val)}
              />
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <InputField
                    type="password"
                    label="Password"
                    placeholder={isEditingPassword ? "Enter new password" : "Password (hidden)"}
                    value={formData.password}
                    onChange={(val:any) => handleFieldChange('password', val)}
                    disabled={!isEditingPassword}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePasswordEditToggle}
                  disabled={saving}
                >
                  {isEditingPassword ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </Grid.Col>
          </Grid>
          
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              loading={saving}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleResetForm}
              disabled={saving}
            >
              Reset Form
            </Button>
          </div>
        </form>
        
        {/* Display non-editable info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Title order={4} mb="md" c="dimmed">Account Information</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">User ID:</span>
              <span className="ml-2 text-gray-800">{userProfile.id}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Role:</span>
              <span className="ml-2 text-gray-800 capitalize">{userProfile.role}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Last Login:</span>
              <span className="ml-2 text-gray-800">
                {new Date(userProfile.last_login).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  );
}