import { useState, useEffect } from 'react'
import { View, SafeAreaView, Alert, ScrollView, Text, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getPackageDetail, PackageDetail } from '@/src/mocks/packageDetail'
import PackageDetailHeader from '@/src/components/client/PackageDetailHeader'
import MetaChipsRow from '@/src/components/client/MetaChipsRow'
import OverviewTab from '@/src/components/client/OverviewTab'
import DetailTab from '@/src/components/client/DetailTab'
import ReviewsTab from '@/src/components/client/ReviewsTab'
import StickyTotalBar from '@/src/components/client/StickyTotalBar'
import { Currency, Tier } from '@/src/components/client/SelectOptionsCard'

export default function PackageDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()
    const [packageData, setPackageData] = useState<PackageDetail | null>(null)
    const [currency, setCurrency] = useState<Currency>('THB')
    const [tier, setTier] = useState<Tier>('vip')
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        if (id) {
            const data = getPackageDetail(id)
            if (data) {
                setPackageData(data)
            } else {
                Alert.alert('Error', 'Package not found')
                router.back()
            }
        }
    }, [id, router])

    const handleBack = () => {
        router.back()
    }

    const handleShare = () => {
        if (packageData) {
            Alert.alert(
                'Share Package',
                `Check out ${packageData.name} - ${packageData.overview}`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Share', onPress: () => {
                            Alert.alert('Shared!', 'Package shared successfully')
                        }
                    }
                ]
            )
        }
    }


    const handleBookNow = () => {
        Alert.alert(
            'Booking Confirmation',
            `You are booking ${quantity} ${tier} package(s) for ${packageData?.name}`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        Alert.alert('Success', 'Booking confirmed!')
                        router.push('/(protected)/(client)/packages/page')
                    }
                }
            ]
        )
    }

    const calculateTotal = () => {
        if (!packageData) return 0
        const price = packageData.prices.find(p => p.currency === currency && p.tier === tier)
        return price ? price.price * quantity : 0
    }

    if (!packageData) {
        return (
            <SafeAreaView className="flex-1 bg-gray-100">
                <View className="flex-1 items-center justify-center">
                </View>
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <ScrollView>
                <View className="flex-1">
                    <PackageDetailHeader
                        packageData={packageData}
                        onBack={handleBack}
                        onShare={handleShare}
                    />
                    <MetaChipsRow packageData={packageData} />
                    <View className="px-4 py-2 flex-row justify-center gap-2 bg-white rounded-full w-fit mx-auto">
                        <Pressable className={activeTab === 'overview' ? "bg-orange-500  rounded-full px-4 py-2" : "bg-transparent  rounded-full px-4 py-2"} onPress={() => setActiveTab('overview')}>
                            <Text className={activeTab === 'overview' ? "text-white font-medium" : "text-gray-900 font-medium"}>Overview</Text>
                        </Pressable>
                        <Pressable className={activeTab === 'detail' ? "bg-orange-500  rounded-full px-4 py-2" : "bg-transparent  rounded-full px-4 py-2"} onPress={() => setActiveTab('detail')}>
                            <Text className={activeTab === 'detail' ? "text-white font-medium" : "text-gray-900 font-medium"}>Detail</Text>
                        </Pressable>
                        <Pressable className={activeTab === 'reviews' ? "bg-orange-500  rounded-full px-4 py-2" : "bg-transparent  rounded-full px-4 py-2"} onPress={() => setActiveTab('reviews')}>
                            <Text className={activeTab === 'reviews' ? "text-white font-medium" : "text-gray-900 font-medium"}>Reviews</Text>
                        </Pressable>
                    </View>
                    {activeTab === 'overview' && (
                        <OverviewTab
                            packageData={packageData}
                            currency={currency}
                            tier={tier}
                            quantity={quantity}
                            onCurrencyChange={setCurrency}
                            onTierChange={setTier}
                            onQuantityChange={setQuantity}
                        />
                    )}
                    {activeTab === 'detail' && (
                        <View className="px-4 py-2">
                            <Text className="text-gray-900 font-bold text-lg mb-4">Detail Tab</Text>
                        </View>
                    )}
                    {activeTab === 'detail' && (
                        <DetailTab
                            packageData={packageData}
                            currency={currency}
                            tier={tier}
                            quantity={quantity}
                            onCurrencyChange={setCurrency}
                            onTierChange={setTier}
                            onQuantityChange={setQuantity}
                        />
                    )}

                    <View className="px-4 py-2">
                        <Text className="text-gray-900 font-bold text-lg mb-4">Reviews Tab</Text>
                    </View>
                    {activeTab === 'reviews' && (
                        <ReviewsTab
                            packageData={packageData}
                            currency={currency}
                            tier={tier}
                            quantity={quantity}
                            onCurrencyChange={setCurrency}
                            onTierChange={setTier}
                            onQuantityChange={setQuantity}
                        />
                    )}
                    <StickyTotalBar
                        currency={currency}
                        tier={tier}
                        quantity={quantity}
                        totalPrice={calculateTotal()}
                        onBookNow={handleBookNow}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}