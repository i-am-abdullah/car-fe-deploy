// components/CarListingModal/Tabs/ImagesSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { Group, Text, SimpleGrid, Image, Stack, Box, Progress, Alert, Button } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { uploadCarImages } from '@/services/carListingServices';

interface ImagesSectionProps {
  images?: string[];
  onChange: (images: string[]) => void;
  onUploadStatusChange?: (hasUploading: boolean) => void;
  error?: string;
}

type UploadingFile = {
  file: FileWithPath;
  url: string;
  progress: number;
  error?: string;
};

type RemotePreviewItem = {
  type: 'remote';
  url: string;
};

type LocalPreviewItem = {
  type: 'local';
  url: string;
  file: FileWithPath;
  uploading?: boolean;
  error?: string;
};

type PreviewItem = RemotePreviewItem | LocalPreviewItem;

export function ImagesSection({ 
  images = [], 
  onChange, 
  onUploadStatusChange,
  error 
}: ImagesSectionProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  // Notify parent about upload status
  useEffect(() => {
    const hasActiveUploads = uploadingFiles.some(item => !item.error);
    onUploadStatusChange?.(hasActiveUploads);
  }, [uploadingFiles, onUploadStatusChange]);

  // Preview images (existing URLs + uploading files)
  const previews: PreviewItem[] = [
    ...images.map<RemotePreviewItem>((url) => ({ type: 'remote', url })),
    ...uploadingFiles.map<LocalPreviewItem>((item) => ({
      type: 'local',
      url: item.url,
      file: item.file,
      uploading: true,
      error: item.error,
    })),
  ];

  const uploadSingleFile = async (file: FileWithPath) => {
    const fileId = `${file.name}-${Date.now()}`;
    const objectUrl = URL.createObjectURL(file);
    
    // Add to uploading files with progress tracking
    const uploadingFile: UploadingFile = {
      file,
      url: objectUrl,
      progress: 0,
    };
    
    setUploadingFiles(current => [...current, uploadingFile]);

    // Declare progressInterval outside try block so it's accessible in catch
    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // Simulate progress updates (you can replace this with actual progress tracking if your upload service supports it)
      progressInterval = setInterval(() => {
        setUploadingFiles(current => 
          current.map(item => 
            item.file === file && item.progress < 90 
              ? { ...item, progress: item.progress + 10 }
              : item
          )
        );
      }, 200);

      // Upload the file (modify this to upload single file instead of array)
      const uploadedUrls = await uploadCarImages([file]);
      
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      
      if (uploadedUrls && uploadedUrls.length > 0) {
        // Add the uploaded URL to the images array
        onChange([...images, uploadedUrls[0]]);
        
        // Remove from uploading files
        setUploadingFiles(current => 
          current.filter(item => item.file !== file)
        );
        
        // Clean up object URL
        URL.revokeObjectURL(objectUrl);
      } else {
        throw new Error('No URL returned from upload');
      }
    } catch (error) {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      
      // Mark as error in uploading files
      setUploadingFiles(current =>
        current.map(item =>
          item.file === file
            ? { ...item, error: error instanceof Error ? error.message : 'Upload failed', progress: 100 }
            : item
        )
      );
      
      // Add to error list
      setUploadErrors(current => [...current, `Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    }
  };

  const handleDrop = async (droppedFiles: FileWithPath[]) => {
    // Clear previous errors
    setUploadErrors([]);
    
    // Upload each file immediately
    droppedFiles.forEach(file => {
      uploadSingleFile(file);
    });
  };

  const handleRemoveUploadingFile = (file: FileWithPath) => {
    setUploadingFiles(current => {
      const item = current.find(item => item.file === file);
      if (item) {
        URL.revokeObjectURL(item.url);
      }
      return current.filter(item => item.file !== file);
    });
  };

  const handleRemoveImage = (url: string) => {
    onChange(images.filter(img => img !== url));
  };

  const handleRetryUpload = (file: FileWithPath) => {
    // Remove from current uploading files and retry
    setUploadingFiles(current => {
      const item = current.find(item => item.file === file);
      if (item) {
        URL.revokeObjectURL(item.url);
      }
      return current.filter(item => item.file !== file);
    });
    
    uploadSingleFile(file);
  };

  const clearErrors = () => {
    setUploadErrors([]);
  };

  return (
    <Stack>
      <Dropzone
        onDrop={handleDrop}
        accept={['image/png', 'image/jpeg', 'image/gif', 'image/webp']}
        maxSize={5 * 1024 * 1024} // 5MB
        disabled={uploadingFiles.some(item => !item.error)} // Disable while uploading
        style={{
          borderColor: error ? '#fa5252' : undefined,
        }}
      >
        <Group justify="center" gap="xl" style={{ pointerEvents: 'none', minHeight: 120 }}>
          <Dropzone.Accept>
            <IconUpload size={50} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={50} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <Stack>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline>
              Images will be uploaded automatically. Each file should not exceed 5MB
            </Text>
            <Text size="sm" color="red" inline fw={500}>
              * At least one image is required
            </Text>
            {uploadingFiles.some(item => !item.error) && (
              <Text size="sm" color="blue" inline>
                Uploading {uploadingFiles.filter(item => !item.error).length} file(s)...
              </Text>
            )}
          </Stack>
        </Group>
      </Dropzone>

      {/* Image validation error */}
      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          color="red"
          variant="light"
        >
          {error}
        </Alert>
      )}

      {/* Upload Errors */}
      {uploadErrors.length > 0 && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Upload Errors"
          color="red"
          withCloseButton
          onClose={clearErrors}
        >
          <Stack gap="xs">
            {uploadErrors.map((error, index) => (
              <Text key={index} size="sm">{error}</Text>
            ))}
          </Stack>
        </Alert>
      )}

      {previews.length > 0 && (
        <Box mt="xl">
          <Text fw={500} mb="md">
            Car Images ({images.length} uploaded)
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {previews.map((item, index) => (
              <Box key={`${item.url}-${index}`} pos="relative">
                <Image
                  src={item.url}
                  alt={`Car image ${index + 1}`}
                  radius="md"
                  h={160}
                  fit="cover"
                  style={{
                    opacity: item.type === 'local' && item.uploading ? 0.7 : 1,
                  }}
                />
                
                {/* Progress bar for uploading files */}
                {item.type === 'local' && item.uploading && !item.error && (
                  <Progress
                    value={uploadingFiles.find(f => f.file === item.file)?.progress || 0}
                    size="sm"
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: 5,
                      right: 5,
                    }}
                  />
                )}

                {/* Error indicator */}
                {item.type === 'local' && item.error && (
                  <Box
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: 5,
                      right: 5,
                      backgroundColor: 'rgba(255, 0, 0, 0.8)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      textAlign: 'center',
                    }}
                  >
                    Upload failed - Retry or Delete
                  </Box>
                )}

                {/* Action buttons */}
                {item.type === 'local' && item.error ? (
                  // Show both Retry and Delete buttons for failed uploads
                  <Group
                    gap="xs"
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                    }}
                  >
                    <Button
                      variant="filled"
                      color="orange"
                      size="xs"
                      onClick={() => handleRetryUpload(item.file)}
                      title="Retry upload"
                    >
                      <IconUpload size={16} />
                    </Button>
                    <Button
                      variant="filled"
                      color="red"
                      size="xs"
                      onClick={() => handleRemoveUploadingFile(item.file)}
                      title="Delete failed upload"
                    >
                      <IconTrash size={16} />
                    </Button>
                  </Group>
                ) : (
                  // Single remove button for successful uploads or uploading files
                  <Button
                    variant="filled"
                    color="red"
                    size="xs"
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                    }}
                    onClick={() =>
                      item.type === 'remote'
                        ? handleRemoveImage(item.url)
                        : handleRemoveUploadingFile(item.file)
                    }
                    disabled={item.type === 'local' && item.uploading && !item.error}
                    title={item.type === 'remote' ? "Remove image" : "Cancel upload"}
                  >
                    <IconTrash size={16} />
                  </Button>
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Upload status message */}
      {uploadingFiles.some(item => !item.error) && (
        <Alert
          icon={<IconUpload size={16} />}
          color="blue"
          variant="light"
          mt="md"
        >
          Please wait for all images to finish uploading before submitting the form.
        </Alert>
      )}
    </Stack>
  );
}