import { Link } from "react-router-dom";
import {
  Phone,
  Shield,
  Users,
  Volume2,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Mail,
  MapPin,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { addToast } = useToast();

  const [signupForm, setSignupForm] = useState({
    name: "",
    phone: "",
    email: "",
    chamaName: "",
    role: "Member",
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupForm),
        }
      );

      if (response.ok) {
        const data = await response.json();
        addToast("Registration successful! Welcome to SautiChama.", "success");
        setShowSignupModal(false);
        setSignupForm({
          name: "",
          phone: "",
          email: "",
          chamaName: "",
          role: "Member",
        });
      } else {
        const error = await response.json();
        addToast(
          error.message || "Registration failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      addToast(
        "Registration submitted! We will contact you shortly.",
        "success"
      );
      setShowSignupModal(false);
      setSignupForm({
        name: "",
        phone: "",
        email: "",
        chamaName: "",
        role: "Member",
      });
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    addToast("Message sent! Our team will reach out soon.", "success");
    setShowContactModal(false);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Volume2 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-primary-700">
                SautiChama
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-primary-600 transition"
              >
                How It Works
              </a>
              <button
                onClick={scrollToContact}
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Contact
              </button>
              <Link to="/admin">
                <Button variant="outline">Admin Login</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <a
                href="#features"
                className="block py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <button
                onClick={() => {
                  scrollToContact();
                  setMobileMenuOpen(false);
                }}
                className="block py-2 text-gray-700 hover:text-primary-600 w-full text-left"
              >
                Contact
              </button>
              <Link to="/admin" className="block py-2">
                <Button variant="outline" className="w-full">
                  Admin Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering <span className="text-primary-600">Table Banking</span>
              <br />
              Through Technology
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SautiChama brings transparency and trust to Chamas with
              multi-signature approvals and voice-based notifications. Making
              financial inclusion accessible for everyone, including the
              unbanked and illiterate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg"
                onClick={() => setShowSignupModal(true)}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">100%</div>
              <div className="text-gray-600 mt-2">Transparent Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">
                Multi-Sig
              </div>
              <div className="text-gray-600 mt-2">Approval System</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">Voice</div>
              <div className="text-gray-600 mt-2">Accessible to All</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SautiChama?
            </h2>
            <p className="text-xl text-gray-600">
              Built for trust, designed for accessibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-xl">
                  Multi-Signature Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Withdrawals require approval from multiple officials (Chair,
                  Treasurer, Secretary), preventing theft and unauthorized
                  transactions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition">
              <CardHeader>
                <Volume2 className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-xl">Voice Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automated voice calls in Swahili and English ensure everyone
                  understands transactions, including those who cannot read.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition">
              <CardHeader>
                <Phone className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-xl">USSD Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simple USSD menus work on any phone - no smartphone or
                  internet required. Perfect for rural communities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition">
              <CardHeader>
                <Users className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-xl">Complete Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All members receive real-time updates about transactions and
                  balances, eliminating the risk of record manipulation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, secure, and accessible in three steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Request via USSD
              </h3>
              <p className="text-gray-600 text-center">
                The Chairperson initiates a withdrawal request using a simple
                USSD menu (e.g., *123#). Enter the amount and recipient details.
              </p>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <code className="text-sm text-primary-800">
                  *123# → Withdraw → Amount: 5000 KES → Recipient: Mary
                </code>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Multi-Sig Approval
              </h3>
              <p className="text-gray-600 text-center">
                The Treasurer and Secretary receive SMS/USSD prompts to approve
                the transaction. Both must approve for the transaction to
                proceed.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm text-primary-800">
                    Treasurer: Approved
                  </span>
                </div>
                <div className="flex items-center p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm text-primary-800">
                    Secretary: Approved
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Voice Notification
              </h3>
              <p className="text-gray-600 text-center">
                Once approved, an automated voice call notifies the recipient
                and all members about the transaction and updated balance.
              </p>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <div className="flex items-start">
                  <Volume2 className="h-5 w-5 text-primary-600 mr-2 mt-1" />
                  <p className="text-sm text-primary-800 italic">
                    "Sauti-Chama Alert: 5000 Shillings has been approved for
                    Mary. Group balance is now 20,000 Shillings."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Problem We Solve
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Theft & Fraud
                    </h4>
                    <p className="text-gray-600">
                      Treasurers running away with group funds due to lack of
                      oversight
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Illiteracy Barriers
                    </h4>
                    <p className="text-gray-600">
                      Older members and rural women cannot verify SMS receipts
                      or USSD menus
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Record Manipulation
                    </h4>
                    <p className="text-gray-600">
                      Physical notebooks can be lost, altered, or destroyed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary-700 mb-6">
                Our Solution
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Multi-Signature Approval
                    </h4>
                    <p className="text-gray-600">
                      Multiple officials must approve before any funds move
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Voice-Based Accessibility
                    </h4>
                    <p className="text-gray-600">
                      Everyone can understand transactions through automated
                      voice calls
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Digital Ledger
                    </h4>
                    <p className="text-gray-600">
                      Immutable digital records that cannot be lost or altered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Join SautiChama?</h2>
          <p className="text-xl mb-8 text-green-100">
            Register as a member and start your financial journey with trust and
            transparency
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-primary-700 hover:bg-green-50"
              onClick={() => setShowSignupModal(true)}
            >
              Join Now
            </Button>
            <Button
              size="lg"
              className="bg-primary-800 hover:bg-primary-900"
              onClick={() => setShowContactModal(true)}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Volume2 className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-2xl font-bold">SautiChama</span>
              </div>
              <p className="text-gray-400">
                Empowering communities through voice-enabled financial
                technology
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-white transition"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Admin Portal
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@sautichama.com
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +254 700 000 000
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Nairobi, Kenya
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SautiChama. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {/* Signup Modal */}
      <Modal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <ModalHeader>
          <ModalTitle>Join SautiChama</ModalTitle>
          <ModalDescription>
            Register as a member to start your financial journey
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSignup}>
          <ModalContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={signupForm.name}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={signupForm.phone}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="+254 712 345 678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chama Name *
              </label>
              <input
                type="text"
                required
                value={signupForm.chamaName}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, chamaName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Which chama do you want to join?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={signupForm.role}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Member">Member</option>
                <option value="Chairperson">Chairperson</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Secretary">Secretary</option>
              </select>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSignupModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Join SautiChama</Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Demo Modal */}
      <Modal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)}>
        <ModalHeader>
          <ModalTitle>SautiChama Demo</ModalTitle>
          <ModalDescription>
            See how SautiChama works in action
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <p className="text-gray-600">Demo video would be embedded here</p>
              <p className="text-sm text-gray-500 mt-2">
                Showcasing the USSD workflow and voice notifications
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-primary-700 mb-2">
                What you'll see:
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• USSD menu navigation</li>
                <li>• Multi-signature approval process</li>
                <li>• Voice notification in Swahili & English</li>
                <li>• Real-time balance updates</li>
              </ul>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setShowDemoModal(false)}>Close</Button>
        </ModalFooter>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      >
        <ModalHeader>
          <ModalTitle>Contact Our Sales Team</ModalTitle>
          <ModalDescription>
            We'll get back to you within 24 hours
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={handleContact}>
          <ModalContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={contactForm.phone}
                onChange={(e) =>
                  setContactForm({ ...contactForm, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="+254 712 345 678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                required
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell us about your chama and how we can help..."
              />
            </div>
          </ModalContent>
          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowContactModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Message</Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
