import { View, Text, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { set_login_loading, set_storage } from '../../redux/slices';
import CustomButton from '../../components/button/CustomButton';
import CustomTextInput from '../../components/CustomInput';
import { useState } from 'react';
import { Image } from 'react-native';
import AutrhIamge from '../../../assets/auth.png'
import { AuthStyles } from './AuthStyles';
import { Link } from '@react-navigation/native';
import { login } from '../../api/login';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { COLORS } from '../../constants/colors';
import { ICONSIZE } from '../../constants/FontSizes';
import Loading from '../../components/Loading';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email!').required('Email required!'),
  password: Yup.string()
    .min(10, 'Password too short!')
    .max(10, 'Password too long!')
    .required('Password required!'),
});


export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()

  const [isPasswordHidden, setIsPasswordHiden] = useState(true)
  const loading = useSelector(state => state.app.loginLoading)



const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: type === 'success' ? 'Success' : 'Error',
      text2: text
    });
  }

  const onLogin = async (values) => {
    dispatch(set_login_loading(true))

    const userData = {
      email: values.email,
      password: values.password,
    }

    const res = await login(userData)

    if (res.resData) {
      let userStorage = {
        'refresh': res.resData.refresh,
        'id': res.resData.patient.id
      }
      dispatch(set_storage(userStorage))
    } else {
      if(res.resError.response){
        showToast('error', res.resError.response.data.error)
      }else{
        showToast('error', res.resError.message)
      }
    }
    dispatch(set_login_loading(false))
    
  }

  return (
    <SafeAreaView>
      <View style={AuthStyles.container}>
        <Toast />
        <View >
          <Image source={AutrhIamge} style={AuthStyles.image} />
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => onLogin(values)}
          
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={AuthStyles.form} >
              <CustomTextInput

                iconName={'mail'}
                placeholder={'Email'}
                value={values.email}
                setState={handleChange('email')}
                error={errors.email}
                errors_touched={touched.email}
              />


              <CustomTextInput

                iconName={'lock-open'}
                placeholder={'Password'}
                value={values.password}
                setState={handleChange('password')}
                isPassword={true}
                isPasswordHidden={isPasswordHidden}
                setIsPasswordHiden={setIsPasswordHiden}
                error={errors.password}
                errors_touched={touched.password}
              />

              <CustomButton

                name={'Login'}
                callback={handleSubmit}
                icon={'enter'}
                loading={loading}
                backgroundColor={COLORS.PRIMARY}
              />
              <TouchableOpacity>

                {/* <Link> */}
                  <Text style={AuthStyles.text}>Forget password?</Text>
                {/* </Link> */}
              </TouchableOpacity>

            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

