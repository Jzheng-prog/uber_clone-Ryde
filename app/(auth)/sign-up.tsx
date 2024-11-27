import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "zhengjohn017@gmail.com",
    email: "zhengjohn017@gmail.com",
    password: "zhengjohn017@gmail.com",
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const onSignUpPress = async () => {
    //delete after fixing the clerk

    // router.push("/(auth)/sign-in");
    //uncomment when fixing the clerk

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Sign in Error ddd", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification Failed",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };
  useEffect(() => {
    console.log({ showSuccessModal }, { verification });
  }, [showSuccessModal, verification]);
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-white flex-1">
        <View className="w-full relative h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholderTextColor="#cccccc"
            placeholder="Enter Your Name"
            value={form.name}
            icon={icons.person}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholderTextColor="#cccccc"
            placeholder="Enter Your Email"
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
            title="sign up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <OAuth />

          <Link
            href="/sign-in"
            className="mt-10 text-general-200 text-lg text-center"
          >
            <Text>Already have an Account?</Text>
            <Text className="text-primary-500"> Login</Text>
          </Link>
        </View>
        <ReactNativeModal isVisible={showSuccessModal}>
          {/* ={verification.state === "success"} */}
          <View className="border bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl text-center font-JakartaBold">
              Verified
            </Text>
            <Text className="text-lg text-center font-JakartaBold">
              {form.email}
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/tabHome");
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          {/* ={verification.state === "success"} */}
          <View className="border bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl font-JakartaBold mb-2">Verification</Text>
            <Text className="text-lg font-Jakarta mb-5">
              Verification code has been sent to {form.email}
            </Text>
            <InputField
              label="Code"
              placeholder="12345"
              placeholderTextColor="#cccccc"
              icon={icons.lock}
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(e) => {
                setVerification({ ...verification, code: e });
              }}
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              className="mt-5 bg-success-500"
              onPress={onPressVerify}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
