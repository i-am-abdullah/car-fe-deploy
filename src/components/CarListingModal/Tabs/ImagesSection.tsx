// components/CarListingModal/Tabs/ImagesSection.tsx
'use client';

import { useState } from 'react';
import { Group, Text, SimpleGrid, Image, Stack, Button, Box } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';
import { uploadCarImages } from '@/services/carListingServices';

interface ImagesSectionProps {
  images?: string[];
  onChange: (images: string[]) => void;
}

type RemotePreviewItem = {
  type: 'remote';
  url: string;
};

type LocalPreviewItem = {
  type: 'local';
  url: string;
  file: FileWithPath;
};

type PreviewItem = RemotePreviewItem | LocalPreviewItem;

export function ImagesSection({ images = [], onChange }: ImagesSectionProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploading, setUploading] = useState(false);

  // Preview images (existing URLs + local files)
  const previews: PreviewItem[] = [
    ...images.map<RemotePreviewItem>((url) => ({ type: 'remote', url })),
    ...files.map<LocalPreviewItem>((file) => ({
      type: 'local',
      url: URL.createObjectURL(file),
      file,
    })),
  ];

  const handleDrop = (droppedFiles: FileWithPath[]) => {
    setFiles((current) => [...current, ...droppedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (url: string) => {
    onChange(images.filter(img => img !== url));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls = await uploadCarImages(files);
      onChange([...images, ...uploadedUrls]);
      setFiles([]);
    } catch (error) {
      console.error('Failed to upload images:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack>
      <Dropzone
        onDrop={handleDrop}
        accept={['image/png', 'image/jpeg', 'image/gif', 'image/webp']}
        maxSize={5 * 1024 * 1024} // 5MB
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
              Attach as many files as you need. Each file should not exceed 5MB
            </Text>
          </Stack>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <Group justify="right" mt="md">
          <Button
            onClick={handleUpload}
            loading={uploading}
            disabled={files.length === 0}
          >
            Upload Selected Files
          </Button>
        </Group>
      )}

      {previews.length > 0 && (
        <Box mt="xl">
          <Text fw={500} mb="md">Car Images</Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {previews.map((item, index) => (
              <Box key={`${item.url}-${index}`} pos="relative">
                <Image
                  src={item.url}
                  alt={`Car image ${index + 1}`}
                  radius="md"
                  h={160}
                  fit="cover"
                />
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
                      : handleRemoveFile(files.findIndex((f) => f === item.file))
                  }
                >
                  <IconTrash size={16} />
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Stack>
  );
}