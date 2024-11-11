/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, TextFieldProps, Typography } from '@mui/material';
import { useState, DragEvent, ChangeEvent, MouseEvent, useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import ClearRounded from '@mui/icons-material/ClearRounded';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {
  label?: string;
  width?: string | number;
  height?: string | number;
}

export function ControlledUpload({
  label = 'Arraste e solte o arquivo aqui ou clique para selecionar',
  width = '100%',
  height = '200px',
  ...props
}: Props) {
  const { field } = useController(props);

  const [dragOver, setDragOver] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    field.onChange(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPreview(null);
    field.onChange(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileChange(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (field.value) {
      if (typeof field.value === 'string') {
        setPreview(field.value);
      } else if (field.value instanceof File) {
        handleFileChange(field.value);
      }
    }
  }, [field.value]);

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        position: 'relative',
        width: width,
        height: height,
        border: '2px dashed',
        borderColor: dragOver ? 'secondary.main' : 'primary.main',
        borderRadius: 2,
        padding: 1,
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => document.getElementById(`${field.name}-file`)?.click()}
    >
      <input
        type="file"
        id={`${field.name}-file`}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleChange}
      />
      {field.value ? null : <Typography variant="h6">{label}</Typography>}
      {preview && (
        <Box width="100%" height="100%">
          <img
            src={preview}
            alt="Pré-visualização"
            style={{ width: '100%', height: '100%', objectFit: 'fill' }}
          />
        </Box>
      )}

      {field.value && (
        <IconButton
          color="secondary"
          onClick={handleClear}
          sx={{
            backgroundColor: 'primary.main',
            ':hover': { backgroundColor: 'primary.main' },
            position: 'absolute',
            width: '30px',
            height: '30px',
            borderRadius: '100px',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            right: -10,
            top: -10,
          }}
        >
          <ClearRounded />
        </IconButton>
      )}
    </Box>
  );
}
