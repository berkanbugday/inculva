"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@inculva/ui";

interface Props {
  name: string | null;
  email: string;
  gravatarUrl?: string;
}

export function ProfileForm({ name, email, gravatarUrl }: Props) {
  const [displayName, setDisplayName] = useState(name ?? "");
  const [avatarError, setAvatarError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPw, setChangingPw] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  async function handleNameSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNameError(null);
    setNameSaved(false);

    const result = await authClient.updateUser({ name: displayName });

    if (result.error) {
      setNameError(result.error.message ?? "Failed to update name");
    } else {
      setNameSaved(true);
    }

    setSaving(false);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setChangingPw(true);
    setPwError(null);
    setPwSaved(false);

    const result = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: false,
    });

    if (result.error) {
      setPwError(result.error.message ?? "Failed to change password");
    } else {
      setPwSaved(true);
      setCurrentPassword("");
      setNewPassword("");
    }

    setChangingPw(false);
  }

  return (
    <div className="space-y-6">
      {/* Name & email */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Profile</h3>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold overflow-hidden shrink-0">
            {gravatarUrl && !avatarError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gravatarUrl}
                alt={name ?? email}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              (name ?? email)[0]?.toUpperCase() ?? "?"
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{name ?? email}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Profile photo from{" "}
              <a href="https://gravatar.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
                Gravatar
              </a>{" "}
              — linked to your email address
            </p>
          </div>
        </div>

        <form onSubmit={(e) => void handleNameSave(e)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={displayName}
              onChange={(e) => { setDisplayName(e.target.value); setNameSaved(false); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
              {email}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Contact support to change your email address.
            </p>
          </div>

          {nameError && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{nameError}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className={cn(
                "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors",
                saving && "opacity-60 cursor-not-allowed"
              )}
            >
              {saving ? "Saving…" : "Save name"}
            </button>
            {nameSaved && (
              <span className="text-sm text-green-600 font-medium">✓ Saved</span>
            )}
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>

        <form onSubmit={(e) => void handlePasswordChange(e)} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => { setCurrentPassword(e.target.value); setPwSaved(false); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setPwSaved(false); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min. 8 characters"
            />
          </div>

          {pwError && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{pwError}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={changingPw}
              className={cn(
                "px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors",
                changingPw && "opacity-60 cursor-not-allowed"
              )}
            >
              {changingPw ? "Updating…" : "Change password"}
            </button>
            {pwSaved && (
              <span className="text-sm text-green-600 font-medium">✓ Password updated</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
