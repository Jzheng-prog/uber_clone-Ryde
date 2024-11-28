import { Image, ScrollView, Text, View } from "react-native";
import React, { useState, useCallback } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    //delete after fixing the clerk

    // router.replace("/(root)/(tabs)/rides");
    //uncomment when fixing the clerk

    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);
  // [isLoaded, form.email, form.password]
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-white flex-1">
        <View className="w-full relative h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter Your Email"
            placeholderTextColor="#cccccc"
            value={form.email}
            icon={icons.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholderTextColor="#cccccc"
            placeholder="Enter Your Password"
            value={form.password}
            icon={icons.lock}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Log In"
            onPress={onSignInPress}
            className="mt-6"
          />
          <OAuth />

          <Link
            href="/sign-up"
            className="mt-10 text-general-200 text-lg text-center"
          >
            <Text>Dont have an Account?</Text>
            <Text className="text-primary-500"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
