import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BgAdm from '../assets/casinowp.jpg';
import { IoChevronBackOutline } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import EditUserProfileModal from '../components/EditUserProfileModal';

const PainelAdmin = () => {
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth)
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSearchUser = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        try {
            const response = await axios.get(`/api/admin/search?username=${searchValue}`);
            setSelectedUser(response.data);
            if (response.data) {
                toast.info(`${response.data.name} selecionado com sucesso.`);
            }
        } catch (error) {
            if (error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error('Utilizador não encontrado. Tente novamente.');
            }
            setSelectedUser(null);
        } finally {
            setIsSearching(false);
        }
    };

    const handleEditUser = () => {
        if (selectedUser) {
            setIsEditModalOpen(true);
        } else {
            toast.info('Selecione um utilizador para editar.');
        }
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await axios.delete(`/api/admin/${selectedUser._id}`);
                toast.success('Utilizador apagado com sucesso.');
                setSelectedUser(null);
            } catch (error) {
                console.log(error);
                toast.error('Erro ao tentar apagar utilizador.');
            }
        } else {
            toast.info('Selecione um utilizador para apagar.');
        }
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div>
            <div className='relative'>
                <img src={BgAdm} alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-0" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
                <div className="flex items-center flex-col text-white font-roboto">
                    <div className='items-start flex justify-between w-[1200px] mb-4 mt-16 backdrop-blur-none'>
                        <div className='flex items-center cursor-pointer' onClick={handleGoBack}>
                            <IoChevronBackOutline className="h-5 w-5 mr-3" />
                            <p className='text-2xl font-inter font-medium'>Voltar</p>
                        </div>
                    </div>
                    <div className='items-start flex justify-between w-[1200px] my-4 backdrop-blue-none'>
                        <div className='flex flex-col justify-between w-[60%] font-inter font-extrabold my-4 bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                            <p className='text-3xl'>Estatísticas</p>
                            <ul>
                                <li className="py-4 border-b border-white lg:text-lg text-md">Número de utilizadores registados</li>
                                <li className='py-4 border-b border-white lg:text-lg text-md'>Número de utilizadores online</li>
                                <li className='py-4 border-b border-white lg:text-lg text-md'>Tempo médio de estadia no site</li>
                                <li className='py-4 border-b border-white lg:text-lg text-md'>Jogo mais jogado</li>
                                <li className='py-4 lg:text-lg text-md'>Stat 5</li>
                            </ul>
                        </div>
                        <div className='flex flex-col justify-between items-center w-[35%] my-4 bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                            <p className='text-3xl font-extrabold text-center'>Configurações</p>
                            <button className='text-white font-semibold hover:bg-[#7e704d] bg-[#bda774] mb-4 mt-6 text-[18px] py-2 rounded transition-colors duration-300 w-full'>Comentários</button>
                            <button className='text-white font-semibold hover:bg-[#7e704d] bg-[#bda774] mb-4 mt-6 text-[18px] py-2 rounded transition-colors duration-300 w-full'>Assistente virtual</button>
                            <button className='text-white font-semibold hover:bg-[#7e704d] bg-[#bda774] mb-4 mt-6 text-[18px] py-2 rounded transition-colors duration-300 w-full'>Suspensões</button>
                            <button className='text-white font-semibold hover:bg-[#7e704d] bg-[#bda774] mb-4 mt-6 text-[18px] py-2 rounded transition-colors duration-300 w-full'>Banimentos</button>
                        </div>
                    </div>
                    <div className='items-start flex justify-between w-[1200px] my-4 backdrop-blur-none'>
                        <div className='flex flex-col justify-between items-center w-[35%] my-4 bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                            <p className='text-3xl font-inter font-extrabold'>Gestão de contas</p>
                            <div>
                                <div className='relative mt-4 mb-8'>
                                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="block w-[325px] py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="username" />
                                    <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome de utilizador</label>
                                    <MdPersonSearch onClick={handleSearchUser} className='absolute cursor-pointer top-1 right-0 w-6 h-6' />
                                </div>
                                {isSearching ? (
                                    <div className="flex items-center justify-center text-white">
                                        <Oval
                                            type="Oval"
                                            color="#00BFFF"
                                            height={30}
                                            width={30}
                                        />
                                    </div>
                                ) : (
                                    <p className='text-center'>{selectedUser ? selectedUser.name : 'Nenhum utilizador selecionado'}</p>
                                )}
                                <button onClick={handleEditUser} className='text-white font-semibold hover:bg-[#7e704d] bg-[#bda774] mb-4 mt-6 text-[18px] py-2 rounded transition-colors duration-300 w-full'>Editar</button>
                                <div className='justify-between flex'>
                                    <button onClick={handleDeleteUser} className='w-full text-white font-semibold hover:bg-[#ff1111a3] bg-transparent text-[18px] py-2 rounded transition-colors duration-300'>Apagar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isEditModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative">
                                <EditUserProfileModal
                                    selectedUser={selectedUser}
                                    onClose={handleEditModalClose}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PainelAdmin;