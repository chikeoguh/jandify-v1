"use client";

import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";

const SETTING_GROUPS = [
  {
    group: "Brand",
    label: "Brand Settings",
    fields: [
      { key: "site_name", label: "Site Name", placeholder: "Jandify Global" },
      { key: "tagline", label: "Tagline", placeholder: "Your Guide to Universities Worldwide" },
      { key: "email", label: "Contact Email", placeholder: "hello@jandifyglobal.com" },
      { key: "phone", label: "Phone / WhatsApp", placeholder: "+234 800 000 0000" },
      { key: "address", label: "Address", placeholder: "Lagos, Nigeria" },
    ],
  },
  {
    group: "Social",
    label: "Social Media",
    fields: [
      { key: "whatsapp_url", label: "WhatsApp Link", placeholder: "https://wa.me/234..." },
      { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/..." },
      { key: "telegram_url", label: "Telegram URL", placeholder: "https://t.me/..." },
      { key: "youtube_url", label: "YouTube URL", placeholder: "https://youtube.com/..." },
    ],
  },
  {
    group: "SEO",
    label: "SEO & Meta",
    fields: [
      { key: "meta_description", label: "Default Meta Description", placeholder: "Find universities worldwide…" },
      { key: "google_analytics", label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX" },
    ],
  },
  {
    group: "Features",
    label: "Feature Flags",
    booleans: [
      { key: "consultation_enabled", label: "Enable Consultation Booking" },
      { key: "newsletter_enabled", label: "Enable Newsletter Signup" },
      { key: "testimonials_on_homepage", label: "Show Testimonials on Homepage" },
      { key: "maintenance_mode", label: "Maintenance Mode" },
    ],
  },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string | boolean>>({
    site_name: "Jandify Global",
    tagline: "Your Guide to Universities Worldwide",
    email: "hello@jandifyglobal.com",
    consultation_enabled: true,
    newsletter_enabled: true,
    testimonials_on_homepage: true,
    maintenance_mode: false,
  });
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    // In production: save to DB via API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm">Site-wide configuration and feature flags</p>
        </div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${saved ? "bg-green-600 text-white" : "bg-[#1a56db] hover:bg-[#1e429f] text-white"}`}>
          {saved ? <><CheckCircle size={15} /> Saved</> : <><Save size={15} /> Save Settings</>}
        </button>
      </div>

      <div className="space-y-6">
        {SETTING_GROUPS.map((group) => (
          <div key={group.group} className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-bold text-gray-900 mb-5">{group.label}</h2>

            {group.fields && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">{field.label}</label>
                    <input
                      value={String(values[field.key] || "")}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}

            {group.booleans && (
              <div className="space-y-3">
                {group.booleans.map((field) => (
                  <label key={field.key} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                    <span className="text-sm font-medium text-gray-800">{field.label}</span>
                    <div
                      onClick={() => setValues({ ...values, [field.key]: !values[field.key] })}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${values[field.key] ? "bg-[#1a56db]" : "bg-gray-300"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${values[field.key] ? "translate-x-6" : "translate-x-1"}`} />
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Danger zone */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="font-bold text-red-800 mb-4">⚠️ Danger Zone</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white border border-red-100 rounded-xl">
              <div>
                <div className="font-semibold text-sm text-gray-900">Clear All Audit Logs</div>
                <div className="text-xs text-gray-500">Permanently delete all admin activity logs</div>
              </div>
              <button className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                Clear Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
