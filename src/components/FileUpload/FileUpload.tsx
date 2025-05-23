// components/ImageUpload.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Group,
  Text,
  rem,
  SimpleGrid,
  Image,
  ActionIcon,
  Box,
} from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';

interface ImageUploadProps {
  /** initial files, if any */
  initialFiles?: FileWithPath[];
  /** max number of files allowed */
  maxFiles?: number;
  /** called whenever the list of files changes */
  onChange: (files: FileWithPath[]) => void;
}

export function ImageUpload({
  initialFiles = [],
  maxFiles = 1,
  onChange,
}: ImageUploadProps) {
  const [files, setFiles] = useState<FileWithPath[]>(initialFiles);

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  const handleDrop = (accepted: FileWithPath[]) => {
    const combined = [...files, ...accepted].slice(0, maxFiles);
    setFiles(combined);
  };

  const previews = files.map((file, idx) => {
    const url = URL.createObjectURL(file);
    return (
      <Box key={idx} pos="relative">
        <Image src={url} alt={`preview-${idx}`} height={120} fit="contain" />
        <ActionIcon
          color="red"
          variant="filled"
          radius="xl"
          size="sm"
          pos="absolute"
          top={4}
          right={4}
          onClick={() => {
            const next = files.filter((_, i) => i !== idx);
            setFiles(next);
          }}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Box>
    );
  });

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={['image/png', 'image/jpeg', 'image/webp']}
        maxSize={30 * 1024 ** 2}
        multiple={maxFiles > 1}
      >
        <Group
          justify="center"
          style={{ minHeight: rem(180), pointerEvents: 'none' }}
        >
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
            <Text size="xl">Drag & drop image{maxFiles>1?'s':''} here</Text>
            <Text size="sm" color="dimmed">
              Up to {maxFiles} file{maxFiles>1?'s':''}, max 5MB each
            </Text>
          </div>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <>
          <Text mt="md" fw={500}>
            Selected {files.length} / {maxFiles}
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="sm">
            {previews}
          </SimpleGrid>
        </>
      )}
    </div>
  );
}
