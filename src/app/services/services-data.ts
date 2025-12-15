import type { LucideIcon } from "lucide-react";
import { Palette, Smartphone, PenSquare, Brush, LineChart, ShoppingCart, Cloud, TestTube, Wrench, Code } from "lucide-react";

export interface Service {
    slug: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    icon: LucideIcon;
    details: {
        title: string;
        description: string;
    }[];
}

export const services: Service[] = [
    {
        slug: "ui-ux-creative-design",
        title: "UI/UX Creative Design",
        shortDescription: "We design intuitive, research-backed interfaces focused on usability and conversion — from user research and wireframes to polished, high-fidelity prototypes.",
        longDescription: "Our UI/UX design process is centered around your users. We start with in-depth research to understand their needs and pain points. We then create wireframes and prototypes to test and refine the user experience before moving to high-fidelity designs that are both beautiful and functional.",
        icon: Palette,
        details: [
            {
                title: "User Research & Analysis",
                description: "We conduct interviews, surveys, and usability tests to gather insights into user behavior and needs."
            },
            {
                title: "Wireframing & Prototyping",
                description: "We create low-fidelity wireframes and interactive prototypes to visualize the user flow and test concepts early."
            },
            {
                title: "High-Fidelity Design",
                description: "We design polished, pixel-perfect interfaces that are visually appealing and aligned with your brand identity."
            }
        ]
    },
    {
        slug: "app-development",
        title: "App Development",
        shortDescription: "We build scalable web and mobile applications using modern stacks, automated testing, and CI/CD to ensure performance, reliability, and fast iteration.",
        longDescription: "From concept to deployment, we build high-performance web and mobile apps that are scalable, secure, and ready for the future. Our agile development process ensures we can adapt to your needs and deliver a product that exceeds your expectations.",
        icon: Smartphone,
        details: [
            {
                title: "Web & Mobile Applications",
                description: "We develop custom applications for iOS, Android, and the web using the latest technologies."
            },
            {
                title: "Scalable Architecture",
                description: "We design our applications to handle growth, ensuring they can scale with your business."
            },
            {
                title: "Quality Assurance",
                description: "We perform rigorous testing to ensure your application is bug-free and performs flawlessly."
            }
        ]
    },
    {
        slug: "software-development",
        title: "Software Development",
        shortDescription: "Custom software solutions tailored to your business needs, from desktop applications to complex enterprise systems.",
        longDescription: "We design and develop robust, scalable software solutions that streamline your operations and drive efficiency. Whether you need a custom CRM, an ERP system, or a specialized internal tool, our team has the expertise to deliver.",
        icon: Code,
        details: [
            {
                title: "Custom Software Design",
                description: "We create tailored software solutions that address your specific business challenges and goals."
            },
            {
                title: "Enterprise Solutions",
                description: "We build large-scale enterprise applications that integrate seamlessly with your existing systems."
            },
            {
                title: "System Integration",
                description: "We connect your disparate software systems to ensure data flows smoothly across your organization."
            }
        ]
    },
    {
        slug: "professional-content-writer",
        title: "Professional Content Writer",
        shortDescription: "Our writers craft clear, on-brand, and SEO-friendly content — from marketing copy and blog posts to product messaging and documentation.",
        longDescription: "Content is king, and our team of professional writers knows how to create content that engages your audience and drives results. We specialize in creating high-quality, SEO-friendly content that tells your brand's story and converts visitors into customers.",
        icon: PenSquare,
        details: [
            {
                title: "SEO-Optimized Content",
                description: "We create content that is optimized for search engines to improve your visibility and drive organic traffic."
            },
            {
                title: "Engaging Copywriting",
                description: "We write compelling copy for your website, ads, and marketing materials that captures attention and inspires action."
            },
            {
                title: "Content Strategy",
                description: "We develop a content strategy that aligns with your business goals and targets your ideal audience."
            }
        ]
    },
    {
        slug: "graphic-design",
        title: "Graphic Design",
        shortDescription: "We create cohesive visual identities and marketing assets — logos, illustrations, and campaign materials that strengthen your brand and engage customers.",
        longDescription: "Our graphic design services are all about creating a visual identity that resonates with your audience. From logos and branding to marketing materials and social media graphics, we create designs that are not only beautiful but also effective.",
        icon: Brush,
        details: [
            {
                title: "Logo & Brand Identity",
                description: "We design memorable logos and comprehensive brand guidelines that reflect your company's values."
            },
            {
                title: "Marketing Materials",
                description: "We create a wide range of marketing materials, including brochures, flyers, and business cards."
            },
            {
                title: "Digital Graphics",
                description: "We design engaging graphics for your website, social media, and online advertising campaigns."
            }
        ]
    },
    {
        slug: "seo-and-analytics",
        title: "SEO & Analytics",
        shortDescription: "Research, on-page SEO, schema, dashboards, GA4 and Search Console integration to grow traffic, measure ROI, and surface meaningful KPIs.",
        longDescription: "Our SEO and analytics services are designed to help you understand your audience and improve your online visibility. We use data-driven strategies to optimize your website for search engines, track your performance, and provide insights that help you make smarter business decisions.",
        icon: LineChart,
        details: [
            {
                title: "Search Engine Optimization (SEO)",
                description: "We use a variety of techniques to improve your website's ranking in search engine results."
            },
            {
                title: "Analytics & Reporting",
                description: "We set up and manage analytics tools to track your website's performance and provide detailed reports."
            },
            {
                title: "Conversion Rate Optimization (CRO)",
                description: "We analyze user behavior to identify opportunities to increase conversions and improve your bottom line."
            }
        ]
    },
    {
        slug: "ecommerce-solutions",
        title: "E-commerce Solutions",
        shortDescription: "Storefronts, payments, inventory, and optimized checkout with secure, scalable architecture tailored to your growth plans and merchandising operations.",
        longDescription: "We build e-commerce solutions that are designed to help you sell more. From custom storefronts to seamless payment integrations, we create online stores that are easy to manage, secure, and optimized for conversions.",
        icon: ShoppingCart,
        details: [
            {
                title: "Custom Storefronts",
                description: "We design and develop custom e-commerce websites that are tailored to your brand and your customers."
            },
            {
                title: "Payment Gateway Integration",
                description: "We integrate a variety of payment gateways to provide a seamless checkout experience for your customers."
            },
            {
                title: "Inventory Management",
                description: "We set up and configure inventory management systems to help you keep track of your products."
            }
        ]
    },
    {
        slug: "cloud-and-devops",
        title: "Cloud & DevOps",
        shortDescription: "CI/CD pipelines, containerization, infrastructure as code, monitoring, and high-availability deployments keep releases fast, resilient, observable, and ready to scale.",
        longDescription: "Our Cloud & DevOps services help you build and run applications at scale. We automate your infrastructure, streamline your development pipeline, and ensure your applications are always available and performing at their best.",
        icon: Cloud,
        details: [
            {
                title: "Continuous Integration & Delivery (CI/CD)",
                description: "We set up automated pipelines to build, test, and deploy your applications quickly and reliably."
            },
            {
                title: "Infrastructure as Code (IaC)",
                description: "We use tools like Terraform and Ansible to manage your infrastructure as code, making it easy to provision and scale."
            },
            {
                title: "Monitoring & Logging",
                description: "We set up monitoring and logging solutions to give you visibility into your application's performance and health."
            }
        ]
    },
    {
        slug: "qa-and-test-automation",
        title: "QA & Test Automation",
        shortDescription: "Unit, integration, and end-to-end testing with pipelines, analytics, and dashboards deliver confident releases and traceable quality signals across teams.",
        longDescription: "Our QA and test automation services ensure your applications are reliable and bug-free. We use a combination of manual and automated testing to catch issues early and deliver a high-quality product to your users.",
        icon: TestTube,
        details: [
            {
                title: "Manual & Automated Testing",
                description: "We perform a variety of testing methods to ensure your application meets your quality standards."
            },
            {
                title: "Performance & Load Testing",
                description: "We test your application under heavy load to identify and address performance bottlenecks."
            },
            {
                title: "Security Testing",
                description: "We perform security audits to identify and fix vulnerabilities in your application."
            }
        ]
    },
    {
        slug: "maintenance-and-support",
        title: "Maintenance & Support",
        shortDescription: "Proactive maintenance, performance tuning, backups, security patches, and SLA-driven support keep your products stable, compliant, and healthy after launch.",
        longDescription: "Our maintenance and support services ensure your applications are always running smoothly. We provide proactive maintenance, security updates, and on-demand support to keep your systems online and your users happy.",
        icon: Wrench,
        details: [
            {
                title: "Proactive Maintenance",
                description: "We monitor your application and perform regular maintenance to prevent issues before they occur."
            },
            {
                title: "Security Updates",
                description: "We keep your application and its dependencies up to date with the latest security patches."
            },
            {
                title: "24/7 Support",
                description: "We offer round-the-clock support to address any issues and ensure your application is always available."
            }
        ]
    },
    {
        slug: "web-development",
        title: "Web Development",
        shortDescription: "Modern, Scalable Web Solutions",
        longDescription: "We create stunning, high-performance websites and web applications that drive results. Our team of expert developers uses cutting-edge technologies and best practices to build solutions that are not only visually appealing but also fast, secure, and scalable. From simple landing pages to complex enterprise applications, we deliver web solutions that exceed expectations.",
        icon: Code,
        details: [
            {
                title: "Responsive Design",
                description: "Every website we build is fully responsive, ensuring a seamless experience across all devices - from desktops to tablets to smartphones."
            },
            {
                title: "Progressive Web Apps",
                description: "We develop PWAs that combine the best of web and mobile apps, offering offline functionality, push notifications, and app-like experiences."
            },
            {
                title: "E-commerce Solutions",
                description: "Complete online store development with secure payment processing, inventory management, and conversion-optimized checkout flows."
            },
            {
                title: "CMS Integration",
                description: "Custom CMS solutions or integration with popular platforms like WordPress, Strapi, or Sanity for easy content management."
            },
            {
                title: "API Development",
                description: "RESTful and GraphQL API development for seamless integration with third-party services and mobile applications."
            },
            {
                title: "Performance Optimization",
                description: "Speed optimization techniques including lazy loading, code splitting, and caching strategies for lightning-fast load times."
            }
        ]
    }
];
