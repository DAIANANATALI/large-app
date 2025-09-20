import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Spacer,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { type IntlayerNode, useIntlayer } from "react-intlayer";

import LocaleLink from "~/components/locale-link";
import useAuth from "~/hooks/use-auth";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}

function CTASection() {
  const { cta } = useIntlayer("landing.index");
  const { user } = useAuth();

  return (
    <section className="px-4 py-20 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-4xl font-bold">{cta.title}</h2>
        <p className="mb-8 text-xl">{cta.subtitle}</p>
        <Button
          as={LocaleLink}
          color="secondary"
          size="lg"
          to={user ? "/dashboard" : "/register"}
        >
          {cta.getStarted}
        </Button>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { features } = useIntlayer("landing.index");

  interface FeatureCardProps {
    color: string;
    description: IntlayerNode;
    icon: string;
    title: IntlayerNode;
  }
  function FeatureCard(props: FeatureCardProps) {
    const { color, description, icon, title } = props;

    return (
      <Card className="h-full">
        <CardHeader>
          <Icon className={`mr-4 text-4xl ${color}`} icon={icon} />
          <h3 className="text-2xl font-semibold">{title}</h3>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">{description}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div>
          <h2 className="mb-3 text-center text-4xl font-bold">
            {features.title}
          </h2>
          <p className="text-muted text-center text-xl">{features.subtitle}</p>
        </div>
        <Spacer y={20} />
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            color="text-blue-600"
            description={features.items.themes.description}
            icon="mdi:pen"
            title={features.items.themes.title}
          />
          <FeatureCard
            color="text-green-600"
            description={features.items.multilingual.description}
            icon="mdi:translate"
            title={features.items.multilingual.title}
          />
          <FeatureCard
            color="text-purple-600"
            description={features.items.aiAssistance.description}
            icon="mdi:robot"
            title={features.items.aiAssistance.title}
          />
        </div>
        <Spacer y={10} />
        <div className="flex justify-center">
          <Button as={LocaleLink} color="secondary" to="/posts">
            {features.exploreMore}
          </Button>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const { hero } = useIntlayer("landing.index");
  const { user } = useAuth();

  return (
    <section className="container grid min-h-screen place-items-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-bold">{hero.title}</h1>
          <p className="text-muted text-xl">{hero.subtitle}</p>
          <Button
            as={LocaleLink}
            color="secondary"
            fullWidth
            to={user ? "/dashboard" : "/register"}
          >
            {hero.getStarted}
          </Button>
          <div>
            <div className="flex h-16 space-x-4">
              <div>
                <code className="text-4xl">89</code>
                <p className="text-muted text-sm">Language Options</p>
              </div>
              <Divider orientation="vertical" />
              <div>
                <code className="text-4xl">∞</code>
                <p className="text-muted text-sm">Of Ideas</p>
              </div>
              <Divider orientation="vertical" />
              <div>
                <code className="text-4xl">100%</code>
                <p className="text-muted text-sm">Big Ideas Included</p>
              </div>
            </div>
          </div>
          <Divider />
          <LocaleLink to="https://github.com/AydinTheFirst">
            <Icon className="mr-2 inline-block text-2xl" icon="mdi:github" />
            {hero.builtBy}
          </LocaleLink>
        </div>
        <div>
          <Image src="/images/hero-image.svg" />
        </div>
      </div>
    </section>
  );
}
