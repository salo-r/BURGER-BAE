"use client";
import Footer from "@/components/layout/footer";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk, logoutUser } from "@/redux/slices/auth";
import ManageAddresses from "@/features/address/address";

const ChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);

const OrderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-3.5 h-3.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5 text-[#FF8000]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5 text-[#FF8000]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const GenderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5 text-[#FF8000]"
  >
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" d="M12 12v8M9 17h6" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const sections = {
  profile: "Profile Information",
  addresses: "Manage Addresses",
  pan: "PAN Card Information",
};

export default function Account() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("profile");
  const [activeMenu, setActiveMenu] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  useEffect(() => {
    if (user === undefined) return;
    if (user === null || user.id === undefined) {
      alert("you are not logged in, please login first");
      router.push("/");
    }
  }, [user]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: null,
  });

  const [draft, setDraft] = useState({ ...form });

  const handleDraftChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({
      ...prev,
      [name]: name === "phone" ? Number(value) : value,
    }));
  };

  const startEdit = (field) => {
    setDraft({ ...form });
    setEditing((prev) => ({ ...prev, [field]: true }));
  };

  const saveField = (field) => {
    setForm((prev) => ({ ...prev, ...draft }));
    setEditing((prev) => ({ ...prev, [field]: false }));
  };

  const cancelField = (field) => {
    setDraft({ ...form });
    setEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleSaveAll = () => {
    setForm({ ...draft });
    setEditing({ name: false, email: false, phone: false });
  };

  const handleUpdateUser = async () => {
    const payload = {};

    if (form.name !== user.name) payload.name = form.name;
    if (form.email !== user.email) payload.email = form.email;
    if (form.phone !== user.phone) payload.phone = Number(form.phone);

    if (Object.keys(payload).length === 0) {
      toast.info("No changes to save");
      return;
    }

    const res = await dispatch(updateUserThunk(user.id, payload));
    if (res.status === "SUCCESS") {
      toast.success("User updated successfully");
    } else {
      toast.error("Failed to update user");
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/");
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  return (
    <div className="mt-[80px] min-h-screen bg-[#f1f3f6] font-sans">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Mobile: top bar showing current section with toggle */}
        <div className="flex items-center justify-between mb-3 md:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <span className="text-[#FF8000]">
              {activeMenu === "orders" ? <OrderIcon /> : <SettingsIcon />}
            </span>
            <span>
              {activeMenu === "orders"
                ? "My Orders"
                : activeSection
                  ? sections[activeSection]
                  : "Account Settings"}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#FF8000] border border-[#FF8000] px-3 py-1.5 rounded-sm"
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar — hidden on mobile unless toggled */}
          <aside
            className={`w-full md:w-64 md:shrink-0 ${
              sidebarOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="bg-[#f7f5f2] rounded-sm shadow-sm mb-1 overflow-hidden border border-[#e8e4df]">
              {/* Hello greeting row with initials avatar */}
              <div className="px-5 py-3 border-b border-[#e8e4df] bg-[#f7f5f2] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF8000] flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-white font-bold text-sm tracking-wide">
                    {form.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
                    Hello,
                  </p>
                  <p className="text-sm font-bold text-gray-800 leading-tight">
                    {form.name || user?.email}
                  </p>
                </div>
              </div>

              {/* My Orders */}
              <button
                onClick={() => {
                  setActiveMenu("orders");
                  setActiveSection(null);
                  setSidebarOpen(false);
                  router.push("/track-order");
                }}
                className={`w-full flex items-center justify-between px-5 py-3.5 border-b border-[#e8e4df] transition-colors group ${
                  activeMenu === "orders"
                    ? "bg-[#fff3e0]"
                    : "hover:bg-[#eeece9]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      activeMenu === "orders"
                        ? "text-[#FF8000]"
                        : "text-gray-500"
                    }
                  >
                    <OrderIcon />
                  </span>
                  <span
                    className={`text-sm font-semibold tracking-wide uppercase ${
                      activeMenu === "orders"
                        ? "text-[#FF8000]"
                        : "text-gray-700"
                    }`}
                  >
                    My Orders
                  </span>
                </div>
                <span className="text-gray-400 group-hover:translate-x-0.5 transition-transform">
                  <ChevronRight />
                </span>
              </button>

              {/* Account Settings */}
              <div>
                <button
                  onClick={() => setActiveMenu("account")}
                  className={`w-full flex items-center justify-between px-5 py-3.5 transition-colors group ${
                    activeMenu === "account"
                      ? "bg-[#fff3e0]"
                      : "hover:bg-[#eeece9]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        activeMenu === "account"
                          ? "text-[#FF8000]"
                          : "text-gray-500"
                      }
                    >
                      <SettingsIcon />
                    </span>
                    <span
                      className={`text-sm font-semibold tracking-wide uppercase ${
                        activeMenu === "account"
                          ? "text-[#FF8000]"
                          : "text-gray-700"
                      }`}
                    >
                      Account Settings
                    </span>
                  </div>
                  <span
                    className={`text-gray-400 transition-transform ${
                      activeMenu === "account" ? "rotate-90" : ""
                    }`}
                  >
                    <ChevronRight />
                  </span>
                </button>

                {activeMenu === "account" && (
                  <div className="bg-[#efede9] border-t border-[#e2deda]">
                    {Object.entries(sections).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveSection(key);
                          setSidebarOpen(false);
                        }}
                        className={`w-full text-left px-8 py-2.5 text-sm border-l-2 transition-all ${
                          activeSection === key
                            ? "border-[#FF8000] text-[#FF8000] bg-[#fff8f0] font-semibold"
                            : "border-transparent text-gray-600 hover:text-[#FF8000] hover:bg-[#e8e6e2]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-5 py-3.5 border-t border-[#e8e4df] transition-colors group hover:bg-[#fff5f5]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-400">
                    <LogoutIcon />
                  </span>
                  <span className="text-sm font-semibold tracking-wide uppercase text-red-400">
                    Logout
                  </span>
                </div>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Profile Information */}
            {activeMenu === "account" && activeSection === "profile" && (
              <div className="bg-white rounded-sm shadow-sm">
                <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-800">
                    Personal Information
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Manage your name, email, phone and gender
                  </p>
                </div>

                <div className="px-4 sm:px-8 py-5 sm:py-6 space-y-6 sm:space-y-7">
                  {/* Name */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                        Name
                      </label>
                      <div className="flex items-center gap-3">
                        {editing.name && (
                          <button
                            onClick={() => cancelField("name")}
                            className="text-gray-400 text-xs hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() =>
                            editing.name ? saveField("name") : startEdit("name")
                          }
                          className="flex items-center gap-1 text-[#FF8000] text-xs font-semibold hover:underline"
                        >
                          <EditIcon /> {editing.name ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <input
                        disabled={!editing.name}
                        name="name"
                        value={editing.name ? draft.name : form.name}
                        onChange={handleDraftChange}
                        className={`flex-1 border rounded-sm px-4 py-2.5 text-sm text-gray-800 outline-none transition-all ${
                          editing.name
                            ? "border-[#FF8000] bg-white shadow-sm"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                        }`}
                        placeholder="Enter your Name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <EmailIcon />
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Email Address
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        {editing.email && (
                          <button
                            onClick={() => cancelField("email")}
                            className="text-gray-400 text-xs hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() =>
                            editing.email
                              ? saveField("email")
                              : startEdit("email")
                          }
                          className="flex items-center gap-1 text-[#FF8000] text-xs font-semibold hover:underline"
                        >
                          <EditIcon /> {editing.email ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                    <input
                      disabled={!editing.email}
                      name="email"
                      value={editing.email ? draft.email : form.email}
                      onChange={handleDraftChange}
                      className={`w-full border rounded-sm px-4 py-2.5 text-sm text-gray-800 outline-none transition-all ${
                        editing.email
                          ? "border-[#FF8000] bg-white shadow-sm"
                          : "border-gray-200 bg-gray-50 text-gray-500"
                      }`}
                      placeholder="Add your email address"
                    />
                    {!form.email && !editing.email && (
                      <p className="text-xs text-amber-500 mt-1.5 flex items-center gap-1">
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5 shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        No email added. Add one for account security.
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PhoneIcon />
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                          Mobile Number
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        {editing.phone && (
                          <button
                            onClick={() => cancelField("phone")}
                            className="text-gray-400 text-xs hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() =>
                            editing.phone
                              ? saveField("phone")
                              : startEdit("phone")
                          }
                          className="flex items-center gap-1 text-[#FF8000] text-xs font-semibold hover:underline"
                        >
                          <EditIcon /> {editing.phone ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                    <input
                      disabled={!editing.phone}
                      name="phone"
                      value={editing.phone ? draft.phone : form.phone}
                      onChange={handleDraftChange}
                      className={`w-full border rounded-sm px-4 py-2.5 text-sm text-gray-800 outline-none transition-all ${
                        editing.phone
                          ? "border-[#FF8000] bg-white shadow-sm"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                      }`}
                      placeholder="Mobile Number"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                      Your mobile number is used for login and order updates.
                    </p>
                  </div>

                  {/* Save */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      onClick={() => {
                        handleSaveAll();
                        handleUpdateUser();
                      }}
                      className="w-full sm:w-auto bg-[#FF8000] text-white text-sm font-bold px-10 py-2.5 rounded-sm hover:bg-[#e67200] transition-colors shadow-sm"
                    >
                      SAVE CHANGES
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeMenu === "account" &&
              activeSection === "addresses" &&
              user.address.length === 0 && (
                <div className="bg-white rounded-sm shadow-sm p-6 sm:p-10 text-center">
                  <div className="w-16 h-16 bg-[#fff3e0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF8000"
                      strokeWidth="1.8"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    No Saved Addresses
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Add a delivery address to speed up checkout.
                  </p>
                  <button className="mt-5 border-2 border-[#FF8000] text-[#FF8000] text-sm font-bold px-8 py-2.5 rounded-sm hover:bg-[#fff3e0] transition-colors">
                    + ADD NEW ADDRESS
                  </button>
                </div>
              )}

            {activeMenu === "account" &&
            activeSection === "addresses" &&
            user.address.length > 0 ? (
              <ManageAddresses />
            ) : (
              <div></div>
            )}

            {/* PAN */}
            {activeMenu === "account" && activeSection === "pan" && (
              <div className="bg-white rounded-sm shadow-sm">
                <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-800">
                    PAN Card Information
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Required for purchases above ₹2 lakh
                  </p>
                </div>
                <div className="px-4 sm:px-8 py-5 sm:py-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                    PAN Number
                  </label>
                  <input
                    className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#FF8000] bg-gray-50 uppercase tracking-widest"
                    placeholder="e.g. ABCDE1234F"
                    maxLength={10}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Your PAN details are kept secure and private.
                  </p>
                  <button className="mt-5 w-full sm:w-auto bg-[#FF8000] text-white text-sm font-bold px-10 py-2.5 rounded-sm hover:bg-[#e67200] transition-colors">
                    SAVE PAN
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
