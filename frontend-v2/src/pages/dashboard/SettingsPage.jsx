import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ThemeToggle from "../../components/ui/ThemeToggle";
import toast from "react-hot-toast";

function SettingsPage() {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = (e) => {
    e.preventDefault();
    // Here we would typically make an API call to update the profile
    toast.success("Profile changes saved successfully!");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
      // Make API call to delete account
      toast.success("Account deleted successfully.");
      logout();
      window.location.href = "/register";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10 max-w-4xl mx-auto">
        <h1 className="text-heading-l mb-2">Settings</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Manage your account preferences, notifications, and security.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 border-[var(--border-subtle)]">
          <h2 className="text-xl font-bold mb-1">Profile Information</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Update your account's profile information and email address.</p>
          
          <form className="space-y-5" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Name</label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your name" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
              <Input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@example.com" 
                type="email" 
              />
            </div>

            <div className="pt-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>

        <Card className="p-8 border-[var(--border-subtle)]">
          <h2 className="text-xl font-bold mb-1">Theme Preferences</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Customize the look and feel of your dashboard.</p>
          
          <div className="flex items-center justify-between py-4 border-t border-[var(--border-subtle)]">
            <div>
              <h3 className="font-medium text-[var(--text-primary)]">Color Theme</h3>
              <p className="text-sm text-[var(--text-secondary)]">Toggle between Light and Dark mode.</p>
            </div>
            <ThemeToggle />
          </div>
        </Card>

        <Card className="p-8 border-red-500/20 bg-red-500/5">
          <h2 className="text-xl font-bold mb-1 text-red-500">Danger Zone</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Permanently delete your account and all associated projects.</p>
          
          <button 
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-lg font-medium text-sm"
          >
            Delete Account
          </button>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default SettingsPage;
