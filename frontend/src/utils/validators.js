import { toast } from 'react-toastify';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validateDateOfBirth = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
};

export const validateName = (name) => {
    const regex = /^[A-Za-zÀ-ú\s]+$/;
    return regex.test(name);
};

export const validateUsername = (username) => {
    const regex = /^[A-Za-z0-9._]+$/;
    return regex.test(username);
};

export const validateProfileImage = (file) => {
    if (!file) {
        toast.error('Nenhum arquivo selecionado.');
        return false;
    }

    const acceptedImageTypes = ['image/jpg','image/jpeg', 'image/png'];
    if (!acceptedImageTypes.includes(file.type)) {
        toast.error('O arquivo selecionado não é uma imagem válida. Por favor, selecione uma imagem JPG, JPEG ou PNG.');
        return false;
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSizeInBytes) {
        toast.error('O tamanho do arquivo excede o limite máximo de 10 MB.');
        return false;
    }

    return true;
};