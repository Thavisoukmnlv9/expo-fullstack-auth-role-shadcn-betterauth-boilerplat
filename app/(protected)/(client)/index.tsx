import { Redirect } from 'expo-router'

export default function ClientIndex() {
  return <Redirect href="/(protected)/(client)/home" />
}