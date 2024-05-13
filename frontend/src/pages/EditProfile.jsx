import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import BgEditP from '../assets/rolettetable.jpg'
import { IoChevronBackOutline, IoImagesOutline, IoChevronForwardOutline } from "react-icons/io5";
import { IoMdEye, IoMdStats } from "react-icons/io";
import { FaUserEdit, FaUserLock } from "react-icons/fa";
import { MdOutlineClear, MdOutlineCheck } from "react-icons/md";
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import { setCredentials } from '../slices/authSlice';
import axios from 'axios';
import { useUpdateUserMutation, useUpdatePasswordMutation, useUpdateUserProfileImageMutation } from '../slices/usersApiSlice';
import { validateEmail, validateDateOfBirth, validateName, validateUsername, validateProfileImage } from '../utils/validators';

const EditProfile = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [profession, setProfession] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [file, setFile] = useState();
    const [activeTab, setActiveTab] = useState('stats');

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile] = useUpdateUserMutation();
    const [updatePassword] = useUpdatePasswordMutation();
    const [updateProfileImage] = useUpdateUserProfileImageMutation();

    const [isLoading, setLoading] = useState(false);
    const [userStats, setUserStats] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchUserStats = async () => {
            try {
                const response = await axios.get('/api/user/stats');
                setUserStats(response.data);
            } catch (error) {
                toast.error('Erro ao obter estatísticas do usuário:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserStats(); // Chame a função aqui
    }, [userInfo]);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('/api/admin/is-admin');
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                toast.error('Erro ao verificar administrador:', error);
            }
        };
        checkAdmin();
    }, [userInfo]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        setEmail(userInfo.email);
        setName(userInfo.name);
        setUsername(userInfo.username);
        setDateOfBirth(userInfo.dateOfBirth);
        setProfession(userInfo.profession);
        setGender(userInfo.gender);
    }, [userInfo.email, userInfo.name, userInfo.username, userInfo.dateOfBirth, userInfo.profession, userInfo.gender]);


    const redirectAdmin = () => {
        if (isAdmin) {
            navigateTo('/adminpanel');
        } else {
            toast.error('Não tem permissões suficientes.')
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error('Por favor, insira um endereço de e-mail válido');
            return;
        }

        if (!validateDateOfBirth(dateOfBirth)) {
            toast.error('Por favor, insira uma data de nascimento válida no formato DD/MM/AAAA');
            return;
        }

        if (!validateName(name)) {
            toast.error('Por favor, insira um nome válido');
            return;
        }

        if (!validateUsername(username)) {
            toast.error('Por favor, insira um nome de utilizador válido. Utilize apenas letras, números, ponto (.) e underline (_)');
            return;
        }
        else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    username,
                    email,
                    dateOfBirth,
                    profession,
                    gender
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigateTo(`/${username}/editar-perfil`)
                toast.success('Perfil atualizado com sucesso.')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    const submitPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('As palavra-passes são diferentes.');
        } else {
            try {
                const res = await updatePassword({
                    _id: userInfo._id,
                    password,
                }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Palavra-passe alterada com sucesso!');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const submitImage = async (e) => {
        e.preventDefault();
        if (!validateProfileImage(file)) {
            return;
        } else {
            const formData = new FormData();
            formData.append('profileImage', file);

            try {
                const res = await updateProfileImage(formData);
                dispatch(setCredentials(res.data));
                toast.success('Foto de perfil atualizada com sucesso.');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        }
    }

    const handleGoBack = () => {
        navigateTo('/home');
    };
    return (
        <div className='xl:relative'>
            <img src={BgEditP} alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
            <div className="xl:flex hidden items-center flex-col text-white font-roboto">
                <div className='items-start flex justify-between w-[1200px] mb-4 mt-16 backdrop-blur-none'>
                    <div className='flex items-center cursor-pointer' onClick={handleGoBack}>
                        <IoChevronBackOutline className="h-5 w-5 mr-3" />
                        <p className='text-2xl font-inter font-medium'>Voltar</p>
                    </div>
                </div>
                <div className="flex justify-between w-[1200px] my-4 bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70">
                    <form onSubmit={submitImage} className='w-[35%] justify-center items-center flex flex-col mr-4'>
                        <img src={userInfo.profileImage} alt="Profile Pic" className='rounded-full w-[300px] h-[300px]' />
                        <input id="file-upload" type='file' onChange={handleFileChange} className='hidden'></input>
                        {file && <p className="text-white mt-4">{file.name}</p>}
                        <label htmlFor="file-upload" className='hover:bg-[#bda774] bg-[#7e704d] text-center w-full rounded transition-colors duration-300 font-light font-inter py-2 mt-2 cursor-pointer'>Escolher imagem</label>
                        <button type="submit" className='hover:bg-[#7e704d] bg-transparent w-full rounded transition-colors duration-300 font-light font-inter py-2 mt-4 cursor-pointer'>Confirmar</button>
                    </form>
                    <div className='w-[65%] ml-4 justify-center flex flex-col font-sarabun'>
                        <p className='text-4xl'>Olá,</p>
                        <p className='font-extrabold text-6xl'>{userInfo.username}</p>
                    </div>
                </div>
                <form onSubmit={submitHandler}>
                    <div className='flex flex-col justify-between w-[1200px] my-4 bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                        <div className='flex justify-between'>
                            <p className='font-inter font-extrabold text-3xl'>Detalhes pessoais</p>
                            <div className='flex'>
                                <MdOutlineClear size={25} className='mx-5 cursor-pointer' />
                                <MdOutlineCheck size={25} className='ml-5 cursor-pointer' onClick={submitHandler} type='submit' />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <div className='relative mt-4 mb-10'>
                                    <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome</label>
                                </div>
                                <div className='relative mt-10 mb-5'>
                                    <input type="email" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Endereço de E-mail</label>
                                </div>
                            </div>
                            <div>
                                <div className='relative mt-4 mb-10'>
                                    <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome de utilizador</label>
                                </div>
                                <div className='relative mt-10 mb-5'>
                                    <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                    <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Data de nascimento</label>
                                </div>
                            </div>
                            <div>
                                <div className='relative mt-4 mb-10'>
                                    <select className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" name="profession" value={profession} onChange={(e) => setProfession(e.target.value)}>
                                        <option value="Sem atividade profissional" className="text-gray-900">Sem atividade profissional</option>
                                        <option value="Estudante" className="text-gray-900">Estudante</option>
                                        <option value="Desempregado" className="text-gray-900">Desempregado</option>
                                        <option value="Reformado" className="text-gray-900">Reformado</option>
                                        <option value="Trabalhador por conta própria" className="text-gray-900" >Trabalhador por conta própria</option>
                                    </select>
                                    <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Profissão</label>
                                </div>
                                <div className='relative mt-10 mb-5'>
                                    <select className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="Não especificar" className="text-gray-900">Não especificar</option>
                                        <option value="Masculino" className="text-gray-900">Masculino</option>
                                        <option value="Feminino" className="text-gray-900">Feminino</option>
                                    </select>
                                    <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Género</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='flex justify-between w-[1200px] mt-4 mb-16'>
                    <form onSubmit={submitPassword} className='flex flex-col w-[35%] my-4 bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                        <p className='font-inter font-extrabold text-3xl'>Alterar palavra-passe</p>
                        <div className='w-[300px]'>
                            <div className='relative my-8'>
                                <input type="password" className="block w-[300px] py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nova palavra-passe</label>
                                <IoMdEye className='absolute top-2 right-0 cursor-pointer' />
                            </div>
                            <div className='relative mb-4 mt-8'>
                                <input type="password" className="block w-[300px] py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Confirmar palavra-passe</label>
                                <IoMdEye className='absolute top-2 right-0 cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <button onClick={submitPassword} type='submit' className='font-semibold hover:bg-[#bda774] bg-[#7e704d] mb-4 mt-6 text-[18px] py-2 rounded transition-colors duration-300 w-full'>Confirmar</button>
                            <button className='hover:bg-[#7e704d] bg-transparent text-[18px] py-1 rounded transition-colors duration-300'>Cancelar</button>
                        </div>
                    </form>
                    {isLoading ? (
                        <div className="flex items-center justify-center text-white">
                            <Oval
                                type="Oval"
                                color="#00BFFF"
                                height={30}
                                width={30}
                            />
                        </div>
                    ) : (
                        <div className='flex flex-col  w-[60%] font-inter font-extrabold my-4 bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                            <p className='text-3xl'>Estatísticas pessoais</p>
                            <div className="flex flex-col py-3 h-full">
                                {userStats ? (
                                    <ul className='h-full flex flex-col justify-between'>
                                        <li className="flex justify-between mt-3 pb-6 border-b border-white lg:text-xl">
                                            <span>Tempo total gasto jogando:</span>
                                            <span>{userStats.totalPlayTime.toFixed(2)} minutos</span>
                                        </li>
                                        <li className="flex justify-between mt-3 pb-6 border-b border-white lg:text-xl">
                                            <span>Jogo mais jogado:</span>
                                            <span>{userStats.mostPlayedGame}</span>
                                        </li>
                                        <li className="flex justify-between mt-3 pb-6 lg:text-xl">
                                            <span>Último jogo jogado:</span>
                                            <span>{userStats.lastPlayedGame}</span>
                                        </li>
                                    </ul>
                                ) : (
                                    <p className="text-white">Não há estatísticas disponíveis.</p>
                                )}
                            </div>
                        </div>
                    )}

                </div>
                {isAdmin ? (
                    <div className='flex justify-end w-[1200px] mb-8 backdrop-blur-none'>
                        <div className='flex items-center cursor-pointer' onClick={redirectAdmin}>
                            <p className='text-2xl font-inter font-medium'>Painel de Administração</p>
                            <IoChevronForwardOutline className="h-5 w-5 ml-3" />
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div className='xl:hidden flex flex-col px-4 pb-4 text-white font-roboto'>
                <div className='items-start flex justify-between w-full mb-4 mt-16 backdrop-blur-none'>
                    <div className='flex items-center cursor-pointer' onClick={handleGoBack}>
                        <IoChevronBackOutline className="h-5 w-5 mr-3" />
                        <p className='text-2xl font-inter font-medium'>Voltar</p>
                    </div>
                </div>
                <div className='flex'>
                    <div className='items-start md:w-[25%] h-min w-[20%] bg-black border border-black rounded-md p-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                        <div className='md:flex hidden'>
                            <h1 className=''>Olá, {userInfo.username}</h1>
                        </div>
                        <ul className="my-2 md:flex md:flex-col hidden">
                            <li className='py-2 border-b border-white cursor-pointer' onClick={() => setActiveTab('stats')}>Estatísticas</li>
                            <li className="py-2 border-b border-white cursor-pointer" onClick={() => setActiveTab('altimage')}>Alterar imagem</li>
                            <li className="py-2 border-b border-white cursor-pointer" onClick={() => setActiveTab('password')}>Alterar palavra-passe</li>
                            <li className="py-2 cursor-pointer" onClick={() => setActiveTab('details')}>Detalhes pessoais</li>
                        </ul>
                        <ul className='flex flex-col md:hidden items-center'>
                            <li className='py-3 border-b border-white w-full cursor-pointer' onClick={() => setActiveTab('stats')} title="Estatísticas"><IoMdStats className='mx-auto' size={25} /></li>
                            <li className='py-3 border-b border-white w-full cursor-pointer' onClick={() => setActiveTab('altimage')} title="Alterar imagem"><IoImagesOutline className='mx-auto' size={25} /></li>
                            <li className='py-3 border-b border-white w-full cursor-pointer' onClick={() => setActiveTab('password')} title="Alterar palavra-passe"><FaUserLock className='mx-auto' size={25} /></li>
                            <li className='py-3 cursor-pointer' onClick={() => setActiveTab('details')} title="Detalhes pessoais"><FaUserEdit size={25} /></li>
                        </ul>
                    </div>
                    <div className='w-[75%] h-min bg-black border border-black rounded-md p-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70 ml-4'>
                        {activeTab === 'stats' && (
                            <div className='flex flex-col justify-between font-inter font-extrabold'>
                                <p className='text-3xl'>Estatísticas pessoais</p>
                                <ul>
                                    <li className="py-4 border-b border-white lg:text-lg text-md">Stat 1</li>
                                    <li className='py-4 border-b border-white lg:text-lg text-md'>Stat 2</li>
                                    <li className='py-4 lg:text-lg text-md'>Stat 3</li>
                                </ul>
                            </div>
                        )}
                        {activeTab === 'altimage' && (
                            <form onSubmit={submitImage} className='w-full justify-center items-center flex flex-col mr-4'>
                                <img src={userInfo.profileImage} alt="Profile Pic" className='rounded-full w-[300px] h-[300px]' />
                                <input id="file-upload" type='file' onChange={handleFileChange} className='hidden'></input>
                                {file && <p className="text-white mt-4">{file.name}</p>}
                                <label htmlFor="file-upload" className='hover:bg-[#bda774] bg-[#7e704d] text-center max-w-[350px] w-full rounded transition-colors duration-300 font-light font-inter py-2 mt-2 cursor-pointer'>Escolher imagem</label>
                                <button type="submit" className='hover:bg-[#7e704d] bg-transparent w-full max-w-[350px] rounded transition-colors duration-300 font-light font-inter py-2 mt-4 cursor-pointer'>Confirmar</button>
                            </form>
                        )}
                        {activeTab === 'password' && (
                            <form onSubmit={submitPassword} className="flex flex-col">
                                <p className='font-inter font-extrabold text-2xl sm:text-3xl'>Alterar palavra-passe</p>
                                <div className='w-full'>
                                    <div className='relative my-8'>
                                        <input type="password" className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="profession" />
                                        <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nova palavra-passe</label>
                                        <IoMdEye className='absolute top-2 right-0 cursor-pointer' />
                                    </div>
                                    <div className='relative mb-4 mt-8'>
                                        <input type="password" className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="gender" />
                                        <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Confirmar palavra-passe</label>
                                        <IoMdEye className='absolute top-2 right-0 cursor-pointer' />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <button onClick={submitPassword} type='submit' className='font-semibold hover:bg-[#bda774] bg-[#7e704d] mb-4 mt-6 text-[18px] py-2 rounded transition-colors duration-300 w-full'>Confirmar</button>
                                    <button className='hover:bg-[#7e704d] bg-transparent text-[18px] py-1 rounded transition-colors duration-300'>Cancelar</button>
                                </div>
                            </form>
                        )}
                        {activeTab === 'details' && (
                            <form onSubmit={submitHandler}>
                                <div className='flex flex-col justify-between'>
                                    <div className='flex justify-between'>
                                        <p className='font-inter font-extrabold sm:text-3xl text-xl'>Detalhes pessoais</p>
                                        <div className='flex align-middle justify-between sm:w-[10%] w-max'>
                                            <MdOutlineClear size={25} className='cursor-pointer' />
                                            <MdOutlineCheck size={25} className='cursor-pointer' onClick={submitHandler} type='submit' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col lg:flex-row'>
                                        <div className='w-[50%]'>
                                            <div className='relative mt-4 mb-10'>
                                                <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome</label>
                                            </div>
                                            <div className='relative mt-4 mb-10'>
                                                <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome de utilizador</label>
                                            </div>
                                            <div className='relative mt-10 mb-5'>
                                                <input type="email" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Endereço de E-mail</label>
                                            </div>
                                        </div>
                                        <div className='w-[50%]'>
                                            <div className='relative mt-4 mb-10'>
                                                <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                                <label htmlFor="" className="absolute sm:text-lg text-md duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Data de nascimento</label>
                                            </div>
                                            <div className='relative mt-4 mb-10'>
                                                <select className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" name="profession" value={profession} onChange={(e) => setProfession(e.target.value)}>
                                                    <option value="Sem atividade profissional" className="text-gray-900">Sem atividade profissional</option>
                                                    <option value="Estudante" className="text-gray-900">Estudante</option>
                                                    <option value="Desempregado" className="text-gray-900">Desempregado</option>
                                                    <option value="Reformado" className="text-gray-900">Reformado</option>
                                                    <option value="Trabalhador por conta própria" className="text-gray-900" >Trabalhador por conta própria</option>
                                                </select>
                                                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Profissão</label>
                                            </div>
                                            <div className='relative mt-10 mb-5'>
                                                <select className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                    <option value="Não especificar" className="text-gray-900">Não especificar</option>
                                                    <option value="Masculino" className="text-gray-900">Masculino</option>
                                                    <option value="Feminino" className="text-gray-900">Feminino</option>
                                                </select>
                                                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Género</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                {isAdmin ? (
                    <div className='flex justify-end w-full mb-4 mt-16 backdrop-blur-none'>
                        <div className='flex items-center cursor-pointer' onClick={redirectAdmin}>
                            <p className='text-2xl font-inter font-medium'>Painel de Administrador</p>
                            <IoChevronForwardOutline className="h-5 w-5 ml-3" />
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default EditProfile