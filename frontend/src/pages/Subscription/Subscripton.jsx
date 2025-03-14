/* eslint-disable no-constant-condition */

import { useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";

const paidPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team members",
  "Advanced Reporting",
  "Priority Support",
  "Customization Options",
  "Integration Support",
  "Advanced Security",
  "Training And Resources",
  "Access Control",
  "Custom Workflows",
];

const annualPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team members",
  "Advanced Reporting",
  "Priority Support",
  "Everything which monthly plan has",
];

const freePlan = [
  "Add only 3 project",
  "Basic Task Management",
  "Basic Reporting",
  "Email Notification",
  "Basic Access Control",
];

const Subscripton = () => {
  const subscription = useSelector((store) => store.subscription);

  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9 ">
        <SubscriptionCard
          data={{
            planName: "Free",
            features: freePlan,
            planType: "FREE",
            price: 0,
            buttonName: subscription.userSubscription?.planType == "FREE"
              ? "Current Plan"
              : "Get Started"
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Monthly Paid Plan",
            features: paidPlan,
            planType: "MONTHLY",
            price: 99999,
            buttonName: subscription.userSubscription?.planType == "MONTHLY" ? "Current Plan" : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Annual Paid Plan",
            features: annualPlan,
            planType: "ANNUALLY",
            price: 9999,
            buttonName: subscription.userSubscription?.planType == "ANNUALLY" ? "Current Plan" : "Get Started",
          }}
        />
      </div>
    </div>
  );
};

export default Subscripton;
