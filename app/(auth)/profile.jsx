import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import FormField from "../../components/FormField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";

const profile = () => {
  return (
    <SafeAreaView className=" justify-center  items-center bg-white  h-full  ">
      <View className="  w-full  flex-row justify-end pr-5 ">
        <PrimaryButton
          containerStyles={`w-[130px]  h-[45px]  rounded-2xl border-regularGray`}
          text="connexion"
          textStyles={`text-red text-[17px]`}
          handlePress={() => router.push('/login')}
        />
      </View>
      <Text className="text-xl font-dBold text-thickGray  p-10">
        {" "}
        CREE TON PROFILE{" "}
      </Text>
      <View style={{ gap: 10 }}>
        <FormField />

        <FormField />

        <FormField />

        <FormField />

        <PrimaryButton
          containerStyles={`w-[300px]  rounded-2xl  bg-thickViolet `}
          text={` SE CONNECTER `}
          textStyles={`text-white text-xl`}
        />

        <View className="flex-row mt-5 " style={{ gap: 10 }}>
          <PrimaryButton
            containerStyles={`w-[150px] h-[60px] rounded-2xl border-regularGray `}
            text="F    FACEBOOK"
            textStyles={`text-red text-[17px] `}
          />
          <PrimaryButton
            containerStyles={`w-[150px]  h-[60px] rounded-2xl border-regularGray`}
            text="G    GOOGLE"
            textStyles={`text-red text-[17px]`}
          />
        </View>
      </View>
      <View className=" mt-8 w-[300px] ">
        <Text className="text-regularGray  font-dBold text-center  p-3 ">
          En te connectant mindy, tu aceptes nos conditions d'utilisation et
          notre Politique de Confidentialite.
        </Text>
        <Text className="text-regularGray font-dBold text-center  p-3 ">
          Ce site est protege par reCAPTCHA Entreprise. La Politique se
          Cconfidentialite et les Cconditions de google s'appliquent
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default profile;
