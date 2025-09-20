import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Alert, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getPackageDetail, PackageDetail } from '@/src/mocks/packageDetail'
import PackageDetailHeader from '@/src/components/client/PackageDetailHeader'
import MetaChipsRow from '@/src/components/client/MetaChipsRow'
import TabsBar, { TabType } from '@/src/components/client/TabsBar'
import OverviewTab from '@/src/components/client/OverviewTab'
import DetailTab from '@/src/components/client/DetailTab'
import ReviewsTab from '@/src/components/client/ReviewsTab'
import StickyTotalBar from '@/src/components/client/StickyTotalBar'
import { Currency, Tier } from '@/src/components/client/SelectOptionsCard'

export default function PackageDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()
    const [packageData, setPackageData] = useState<PackageDetail | null>(null)
    const [activeTab, setActiveTab] = useState<TabType>('overview')
    const [currency, setCurrency] = useState<Currency>('THB')
    const [tier, setTier] = useState<Tier>('vip')
    const [quantity, setQuantity] = useState(1)

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
    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
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
                        router.push('/packages')
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

    const renderTabContent = () => {
        const commonProps = {
            packageData,
            currency,
            tier,
            quantity,
            onCurrencyChange: setCurrency,
            onTierChange: setTier,
            onQuantityChange: setQuantity
        }

        switch (activeTab) {
            case 'overview':
                return <OverviewTab {...commonProps} />
            case 'detail':
                return <DetailTab {...commonProps} />
            case 'reviews':
                return <ReviewsTab {...commonProps} />
            default:
                return <OverviewTab {...commonProps} />
        }
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
                    <TabsBar activeTab={activeTab} onTabChange={handleTabChange} />
                    <View className="flex-1">
                        {renderTabContent()}
                    </View>
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
