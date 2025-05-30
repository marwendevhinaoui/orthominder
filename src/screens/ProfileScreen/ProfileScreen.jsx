import { View, Text, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Avatar from '../../../assets/avatar.png'
import { ProfileStyles } from './ProfilStyles'
import { useCallback, useState } from 'react'
import { get_user_data } from '../../api/get_user_data'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Card from '../../components/Card'
import ContentWrapper from '../../components/ContentWrapper'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { FONTSIZE } from '../../constants/FontSizes'
import Loading from '../../components/Loading'



export default function ProfileScreen() {
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.app.user)

  useFocusEffect(

    useCallback(() => {
      const get_user = async () => {
        setLoading(true)
        const res = await get_user_data(user)        
        if (res.resData) {            
          setUserData(res.resData)
        }
        setLoading(false)
      }
      get_user()

    }, []) 
  )

 
    return   (
        <SafeAreaView>

          <ContentWrapper>
              <Image style={ProfileStyles.avatar} source={Avatar} />
              
              
              
              { (userData && !loading) 
              
              ?(<View style={ProfileStyles.container}>

                  <Card marginBottom={12}>
                    <View style={ProfileStyles.row}>
                      <Ionicons style={ProfileStyles.icon} name='person' />
                      <Text style={ProfileStyles.text}>{userData?.full_name || ''}</Text>
                    </View>
                </Card>
                <Card marginBottom={12}>
                    <View style={ProfileStyles.row}>
                      <Ionicons style={ProfileStyles.icon} name='mail' />
                      <Text style={ProfileStyles.text}>{userData?.email || ''}</Text>
                    </View>
                </Card>
                <Card marginBottom={12}>
                    <View style={ProfileStyles.row}>
                      <Ionicons style={ProfileStyles.icon} name='call' />
                      <Text style={ProfileStyles.text}>{userData?.phone_number || ''}</Text>
                    </View>
                </Card>
                <Card marginBottom={12}>
                    <View style={ProfileStyles.row}>
                      <Ionicons style={ProfileStyles.icon} name='location-sharp' />
                      <Text style={ProfileStyles.text}>{userData?.city || ''}</Text>
                    </View>
                </Card>
                <Card marginBottom={12}>
                    <View style={ProfileStyles.row}>
                      <Ionicons style={ProfileStyles.icon} name='locate' />
                      <Text style={ProfileStyles.text}>{userData?.patient_adress || ''}</Text>
                    </View>
                </Card>
                <Card marginBottom={12}>
                    <View style={ProfileStyles.row}>
                      <FontAwesome6 style={ProfileStyles.icon} name='user-doctor' />
                      <Text style={ProfileStyles.text}>{userData?.doctor_name || ''}</Text>
                    </View>
                </Card>
              </View>)
              :<Loading />

            }
            </ContentWrapper>
        </SafeAreaView>
    )
}

