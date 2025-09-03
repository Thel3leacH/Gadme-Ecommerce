import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-blue-50 to-blue-100">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          About GadMe
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600">
          We connect people with the smartest gadgets, powered by AI
          recommendations.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Target className="mx-auto text-chart-2 mb-4" size={40} />
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-gray-600 mt-2">
                To make technology accessible by providing personalized gadget
                recommendations for everyone.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Globe className="mx-auto text-chart-2 mb-4" size={40} />
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="text-gray-600 mt-2">
                To become the world’s leading gadget discovery platform with
                global reach.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="mx-auto text-chart-2 mb-4" size={40} />
              <h3 className="text-xl font-semibold">Our Values</h3>
              <p className="text-gray-600 mt-2">
                Innovation, trust, and customer-first approach drive everything
                we do.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          GadMe is built by passionate engineers, designers, and dreamers who
          believe in the power of smart technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { name: "BOSS", role: "CEO" },
            { name: "BOOM", role: "CEO" },
            { name: "GAM", role: "CEO" },
            { name: "EVE", role: "CEO" },
            { name: "GOLF", role: "CEO" },
          ].map((member, idx) => (
            <Card key={idx} className="shadow-md">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="mb-6">
          Be part of the future of gadget discovery and AI-powered shopping.
        </p>
        <Button size="lg" variant="secondary" className="rounded-2xl px-6">
          Contact Us
        </Button>
      </section>
    </div>
  );
}
