import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { Fontisto } from '@expo/vector-icons';
import { router } from 'expo-router'
import { useGlobalContext } from "../../context/GlobalProvider";
import { signin } from "../api/fetch";
import * as SecureStore from 'expo-secure-store'

const login = () => {
  const { isTablet } = useGlobalContext()
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const loginUser = async () => {
    try {
      setIsLoading(true)
      let token = await signin(loginForm.email, loginForm.password)
      if (!token) throw Error("le token n'existe pas (loginUser)")
      console.log("token is ", token)
      await SecureStore.setItemAsync('authToken', token)
      setIsLoading(false)

      router.replace('/study')
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView className={`justify-center  items-center bg-white  h-full`}>
      <View className="w-full  flex-row justify-end  pr-5  ">
        <PrimaryButton
          handlePress={() => router.replace("/profile")}
          containerStyles={`${isTablet ? 'w-[170px] h-[70px]' : 'w-[130px]  h-[45px]'}  rounded-2xl border-regularGray`}
          text="s' inscrire"
          textStyles={`text-red ${isTablet ? 'text-2xl' : 'text-[17px]'}`}
        />
      </View>
      <Text className={`${isTablet ? 'text-4xl' : 'text-xl'} font-dBold text-thickGray  p-10`}> CONNEXION </Text>
      <View style={{ gap: 10 }}>
        <FormField 
          containerStyles={`${isTablet ? 'w-[500px] h-[80px] text-2xl pl-5' : ''}`}
          handleChangeText={(email) => setLoginForm({...loginForm, email: email})}
          placeholder={"email"}
        />

        <FormField 
          containerStyles={`${isTablet ? 'w-[500px] h-[80px] text-2xl pl-5' : ''}`}
          handleChangeText={(password) => setLoginForm({...loginForm, password: password})}
          placeholder={"password"}
        />

        <PrimaryButton
          containerStyles={`${isTablet ? 'w-[500px]' : 'w-[300px]'}  rounded-2xl  bg-thickViolet `}
          text={isLoading ? '... loading' : 'CE CONNECTER'}
          textStyles={`text-white ${isTablet ? 'text-3xl' : 'text-xl'}`}
          handlePress={loginUser}
        />

        <View className="flex-row mt-5 items-center justify-center" style={{ gap: 10 }}>
        <PrimaryButton
            containerStyles={`${isTablet ? 'w-[220px] h-[70px]' : 'w-[150px]  h-[60px]'} rounded-2xl border-regularGray`}
            text="FACEBOOK"
            textStyles={`text-red ${isTablet ? 'text-2xl' : 'text-[17px]'}`}
          />

          <PrimaryButton
            containerStyles={`${isTablet ? 'w-[220px] h-[70px]' : 'w-[150px]  h-[60px]'} rounded-2xl border-regularGray`}
            text="GOOGLE"
            textStyles={`text-red ${isTablet ? 'text-2xl' : 'text-[17px]'}`}
          />
        </View>
      </View>
      <View className={`mt-8 ${isTablet ? 'w-[500px]' : 'w-[300px]'}`}
      >
        <Text className={`text-regularGray  font-dBold text-center  p-3 ${isTablet ? 'text-2xl' : ''}`}>
          En te connectant mindy, tu aceptes nos conditions d'utilisation et
          notre Politique de Confidentialite.
        </Text>
        <Text className={`text-regularGray  font-dBold text-center  p-3 ${isTablet ? 'text-2xl' : ''}`}>
          Ce site est protege par reCAPTCHA Entreprise. La Politique se
          Cconfidentialite et les Cconditions de google s'appliquent
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default login;
