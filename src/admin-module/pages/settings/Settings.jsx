import { BsEye, BsGift, BsNewspaper, BsStopwatch } from "react-icons/bs";
import SettingsCard from "../../components/Settings/SettingsCard";
import { FaFile, FaPlus } from "react-icons/fa";
import { BiLabel, BiShieldPlus } from "react-icons/bi";

function Settings() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <SettingsCard
                    rightIcon={<BsNewspaper />}
                    title="Manage Sectors"
                    subtitle="Provide personal details and how we can reach you"
                    smallTextIcon={<FaPlus/>}
                    link="/admin/settings/sectors"
                     />
                <SettingsCard
                    rightIcon={<BiShieldPlus />}
                    title="Login and Security"
                    subtitle="Update your password and secure your account"
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
                <SettingsCard
                    rightIcon={<BiLabel />}
                    title="Payments & payouts"
                    subtitle="Review payments, payouts, coupons, and gift cards"
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
                <SettingsCard
                    rightIcon={<FaFile />}
                    title="Manage Salary type"
                    subtitle="Manage taxpayer information and tax documents"
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
                <SettingsCard
                    rightIcon={<BsStopwatch />}
                    title="Notifications"
                    subtitle="Choose notification preferences and how you want to be contacted"
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
                <SettingsCard
                    rightIcon={<BsEye />}
                    title="Privacy & Settings"
                    subtitle="Manage your personal data, connected services, and data sharing settings"
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
                <SettingsCard
                    rightIcon={<BsStopwatch />}
                    title="Global preferences"
                    subtitle="Set your default language, currency, and timezone"
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
                <SettingsCard
                    rightIcon={<BsStopwatch />}
                    title="Manage Currency"
                    subtitle="Add a work email for business trip benefits"
                    smallTextIcon={<FaPlus/>}
                    link="/admin/settings/currency"
                     />
                <SettingsCard
                    rightIcon={<BsStopwatch />}
                    title="Professional hosting tools"
                    subtitle="Get professional tools if you manage several properties on Airbnb"
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
                <SettingsCard
                    rightIcon={<BsGift />}
                    title="Referral credit & coupon"
                    subtitle="You have $0 referral credits and coupon. Learn more."
                    smallTextIcon={<FaPlus/>}
                    link=""
                     />
            </div>


        </>);
}

export default Settings;