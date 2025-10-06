import BuzzGig_Logo from "./BuzzGig_logo.png"
import Girl_img from "./girl.png"
import Girl_crop from "./girl_crop.png"
import shoulder from "./CreativeShoulders.svg"
import shoulderStrokeThree from "./ShoulderStrokeThree.svg"
import shoulderStrokeFour from "./ShoulderStrokeFour.svg"
import rotateicon from "./rotate.svg"
import bullet from "./bullet_bg.png"
import bulletTwo from "./bullet_tw.png"
import card_1 from "./card_1.jpg"
import card_2 from "./card_2.jpeg"
import card_3 from "./card_3.jpeg"
import girl_two from "./girl_two.png"
import bulbInsideBrain from "./bulbInsideBrain.png"
import eggShellBg from "./eggShellBg.png"
import HeroBackground from "./HeroBackground.png"
import HeroBackgroundTwo from "./herobackgroundTwo.png"
import Speaker from "./speaker.png"
import quotes from "./quotes.png"
import ava_1 from "./ava_1.jpeg"
import ava_2 from "./ava_2.jpeg"
import ava_3 from "./ava_3.jpeg"
import ava_4 from "./ava_4.jpeg"
import ideas from "./Ideas.svg"
import imgRev from "./imgRev_1.jpg"
import imgRev_2 from "./imgRev_2.jpeg"
import imgRev_3 from "./imgRev_3.png"
import bulletStroke from "./bulletStroke.svg"
import bulletThree from "./bulletThree.svg"
import star from "./star.png"
import bluestar from "./bluestar.png"
import pricingImgOne from "./pricing_img.jpg"
import pricingImgTwo from "./pricing_imgTwo.jpg"
import loginImg from "./loginImg.jpeg"
import loginBg from "./loginBackground.png"
import SigninImg from "./SigninImg.jpeg"
import RegisterImg from "./loginImgTwo.jpg"
import ClientRole from "./ClientRole.png"
import FreelancersRole from "./FreelancerRole.png"
import ClientRoleWithShadow from "./ClientRoleWithShadow.png"
import backgroundDefaultImg from "./backgroundDefaultImage.jpg"
import userDefaultImage from "./userDefaultImage.jpeg"
import SummaryImg from "./Summaryimage.svg"
import TargetImg from "./Target.jpeg"
import Books from "./books.jpeg"
import ProjectIcon from "./ProjectIcon.jpeg"
import fileUploaderImg from "./fileUploaderImg.png"

import { faMeta, faWindows, faAirbnb, faAmazon, faShopify, faDiscord, faHtml5, faFigma } from "@fortawesome/free-brands-svg-icons";
import { faFilePen, faCode, faDatabase, faLightbulb, faShieldHalved, faTasks } from '@fortawesome/free-solid-svg-icons'


const assets = {
  BuzzGig_Logo,
  Girl_img,
  Girl_crop,
  shoulder,
  shoulderStrokeThree,
  rotateicon,
  bullet,
  bulletTwo,
  shoulderStrokeFour,
  card_1,
  card_2,
  card_3,
  girl_two,
  bulbInsideBrain,
  eggShellBg,
  HeroBackground,
  HeroBackgroundTwo,
  Speaker,
  quotes,
  ava_1,
  ava_2,
  ava_3,
  ava_4,
  ideas,
  imgRev,
  imgRev_2,
  imgRev_3,
  bulletStroke,
  bulletThree,
  star,
  bluestar,
  pricingImgOne,
  pricingImgTwo,
  loginImg,
  SigninImg,
  loginBg,
  RegisterImg,
  ClientRole,
  FreelancersRole,
  ClientRoleWithShadow,
  backgroundDefaultImg,
  userDefaultImage,
  SummaryImg,
  TargetImg,
  Books,
  ProjectIcon,
  fileUploaderImg
}

const logos = [
  faMeta,
  faWindows,
  faAirbnb,
  faAmazon,
  faShopify,
  faDiscord
]

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    userType: "client",
    review: "BuzzGig made hiring freelancers so simple and stress-free. I was able to post my project, review portfolios, and hire a talented designer within a single day. The entire process felt smooth, transparent, and efficient.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    bgColor: "bg-blue-100",
    startColor: "yellow"
  },
  {
    id: 2,
    name: "David Smith",
    userType: "freelancer",
    review: "As a freelancer, I appreciate how easy BuzzGig makes it to showcase my skills, build a profile, and connect with professional clients. The platform feels secure, reliable, and has helped me grow significantly.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    bgColor: "bg-yellow-100",
    startColor: "blue"
  },
  {
    id: 3,
    name: "Sophia Martinez",
    userType: "client",
    review: "I’ve worked with multiple freelancers through BuzzGig and each experience has been seamless. The platform ensures quality, quick communication, and secure transactions, giving me confidence every time I start a new project.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 3,
    bgColor: "bg-blue-100",
    startColor: "yellow"
  },
  {
    id: 4,
    name: "James Lee",
    userType: "freelancer",
    review: "BuzzGig helped me grow my freelancing career tremendously. With consistent projects and professional clients, I now have steady work, greater exposure, and opportunities that align perfectly with my skills and long-term goals.",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    rating: 4,
    bgColor: "bg-yellow-100",
    startColor: "blue"
  },
  {
    id: 5,
    name: "Olivia Brown",
    userType: "client",
    review: "The platform always provides reliable freelancers and ensures secure payments. I never worry about trust or deadlines, because BuzzGig makes the entire hiring process simple, professional, and stress-free for clients like me.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 5,
    bgColor: "bg-blue-100",
    startColor: "yellow"
  },
  {
    id: 6,
    name: "Ethan Wilson",
    userType: "freelancer",
    review: "BuzzGig has completely changed how I manage my freelance work. I can easily track projects, communicate with clients, and ensure payments are secure. It’s the best platform I’ve used so far for freelancing.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    bgColor: "bg-yellow-100",
    startColor: "blue"
  }
];


const jobFields = [
  {
    id: 1,
    title: "Web Development",
    description: "Design, build, and maintain websites or web applications using modern frameworks and tools.",
    image: faHtml5,
    button: "Explore Web Dev"
  },
  {
    id: 2,
    title: "Graphic Design",
    description: "Create engaging visuals, logos, branding materials, and illustrations for businesses and individuals.",
    image: faFigma,
    button: "Explore Design"
  },
  {
    id: 3,
    title: "Content Writing",
    description: "Write blogs, articles, scripts, and marketing content tailored for specific audiences and industries.",
    image: faFilePen,
    button: "Explore Writing"
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Promote businesses online using SEO, social media, ads, and content strategies to drive growth.",
    image: faLightbulb, // replaced bulbInsideBrain with available faLightbulb
    button: "Explore Marketing"
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Build responsive mobile applications for Android and iOS platforms using the latest technologies.",
    image: faCode,
    button: "Explore Mobile Dev"
  },
  {
    id: 6,
    title: "Data Analysis",
    description: "Interpret and analyze data to provide insights, visualizations, and solutions for businesses.",
    image: faDatabase,
    button: "Explore Data"
  },
  {
    id: 7,
    title: "Cybersecurity",
    description: "Protect systems, networks, and data from digital attacks with security tools and best practices.",
    image: faShieldHalved,
    button: "Explore Security"
  },
  {
    id: 8,
    title: "Project Management",
    description: "Plan, execute, and manage projects efficiently to ensure timely delivery and collaboration.",
    image: faTasks,
    button: "Explore Management"
  }
];

const pricingPlans = [
  {
    id: 1,
    name: "Starter Spark",
    price: "9",
    idealFor: "Freelancers, hobbyists, or individuals who need essential tools to manage a few small projects effectively.",

    features: [
      "Access to basic features",
      "Up to 5 projects",
      "Email support",
      "Basic analytics"
    ]
  },
  {
    id: 2,
    name: "GROWTH IGNITE",
    price: "29",
    idealFor: "Small businesses and growing teams who require advanced tools, better support, and improved project management efficiency.",
    features: [
      "Everything in Starter",
      "Up to 50 projects",
      "Priority email & chat support",
      "Advanced analytics",
      "Custom branding"
    ]
  },
  {
    id: 3,
    name: "ELITE VISIONARY",
    price: "59",
    idealFor: "Enterprises and scaling companies needing unlimited projects, premium support, integrations, and powerful team collaboration tools.",
    features: [
      "Everything in Pro",
      "Unlimited projects",
      "Dedicated account manager",
      "24/7 phone support",
      "Team collaboration tools",
      "Integration with 3rd-party services"
    ]
  }
];




export { assets, logos, reviews, jobFields, pricingPlans };