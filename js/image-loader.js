const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export const getImagePreview = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};
