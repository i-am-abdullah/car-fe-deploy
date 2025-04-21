'use client';

import { useState } from 'react';
import { Group, Text, rem, SimpleGrid, Image, Button, ActionIcon } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';
import { CarImage } from '@/types/car';

interface ImageUploadProps {
  images: CarImage[];
  onChange: (images: CarImage[]) => void;
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [files, setFiles] = useState<CarImage[]>(images);

  const previews = files.map((file, index) => (
    <div key={index} style={{ position: 'relative' }}>
      <Image
        src={file.url}
        alt={`Image ${index + 1}`}
        h={120}
        w="auto"
        fit="contain"
      />
      <ActionIcon
        color="red"
        variant="filled"
        radius="xl"
        size="sm"
        style={{ position: 'absolute', top: 5, right: 5 }}
        onClick={() => {
          const newFiles = [...files];
          newFiles.splice(index, 1);
          setFiles(newFiles);
          onChange(newFiles);
        }}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </div>
  ));

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    const newImages = acceptedFiles.map((file) => {
      const imageUrl = URL.createObjectURL(file);
      return { url: imageUrl, thumbnail: imageUrl };
    });
    
    const updatedImages = [...files, ...newImages];
    setFiles(updatedImages);
    onChange(updatedImages);
  };

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        accept={['image/png', 'image/jpeg', 'image/webp']}
        maxSize={5 * 1024 * 1024} // 5MB
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach up to 5 images, each file should not exceed 5MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <>
          <Text mt="md" fw={500}>Uploaded Images</Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
            {previews}
          </SimpleGrid>
        </>
      )}
    </>
  );
}