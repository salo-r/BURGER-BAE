import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUserThunk, checkIfUserLoggedIn } from "../../redux/slices/auth"; // update import path as needed

const TAG_STYLES = {
  home: "bg-green-50 text-green-700 border border-green-200",
  work: "bg-orange-50 text-orange-700 border border-orange-200",
  friends: "bg-purple-50 text-purple-700 border border-purple-200",
  other: "bg-gray-100 text-gray-600 border border-gray-200",
};

const AVATAR_STYLES = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];

function getInitials(name = "") {
  return name
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarStyle(name = "") {
  const idx = name.charCodeAt(0) % AVATAR_STYLES.length;
  return AVATAR_STYLES[idx];
}

function tagClass(type = "") {
  return TAG_STYLES[type.toLowerCase()] || TAG_STYLES.other;
}

const EMPTY_FORM = {
  name: "",
  tel: "",
  email: "",
  locality: "",
  city: "",
  state: "",
  zipcode: "",
  addresstype: "home",
};

// ─── Address Form ────────────────────────────────────────────────────────────

function AddressForm({ initial = EMPTY_FORM, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    tel: initial.tel || "",
    email: initial.email || "",
    locality: initial.locality || "",
    city: initial.city || "",
    state: initial.state || "",
    zipcode: initial.zipcode || "",
    addresstype: initial.addresstype || "home",
  });

  const handle = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm"
    >
      <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        {initial._id ? "Edit Address" : "New Address"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            required
            disabled={loading}
            placeholder="e.g. Saloni"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Phone</label>
          <input
            name="tel"
            value={form.tel}
            onChange={handle}
            required
            disabled={loading}
            placeholder="10-digit number"
            className={inputCls}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs text-gray-500 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handle}
          disabled={loading}
          placeholder="example@email.com"
          className={inputCls}
        />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-gray-500 mb-1">
          Locality / Street
        </label>
        <input
          name="locality"
          value={form.locality}
          onChange={handle}
          required
          disabled={loading}
          placeholder="House no., street, landmark"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handle}
            required
            disabled={loading}
            placeholder="City"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handle}
            required
            disabled={loading}
            placeholder="State"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Pincode</label>
          <input
            name="zipcode"
            value={form.zipcode}
            onChange={handle}
            required
            disabled={loading}
            placeholder="6-digit PIN"
            className={inputCls}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs text-gray-500 mb-1">Address Type</label>
        <div className="flex gap-2 flex-wrap">
          {["home", "work", "friends", "other"].map((type) => (
            <button
              key={type}
              type="button"
              disabled={loading}
              onClick={() => setForm((p) => ({ ...p, addresstype: type }))}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition capitalize disabled:opacity-50 disabled:cursor-not-allowed ${
                form.addresstype === type
                  ? tagClass(type) + " ring-1 ring-offset-1 ring-current"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2874f0] text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          )}
          {loading ? "Saving..." : "Save Address"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-5 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Address Card ─────────────────────────────────────────────────────────────

function AddressCard({ address, onEdit, onDelete, deleting }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = getInitials(address.name);
  const avatarStyle = getAvatarStyle(address.name);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-3 hover:border-gray-300 hover:shadow-sm transition-all duration-200 relative">
      <div className="flex items-start justify-between gap-3">
        {/* Left: avatar + info */}
        <div className="flex gap-3 items-start flex-1 min-w-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${avatarStyle}`}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            {/* Name + phone + tag row */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-900">
                {address.name}
              </span>
              <span className="text-sm text-gray-500">{address.tel}</span>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${tagClass(
                  address.addresstype
                )}`}
              >
                {address.addresstype}
              </span>
            </div>

            {/* Address line */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {address.locality}, {address.city}, {address.state}
              {" \u2013 "}
              <span className="font-semibold text-gray-800">
                {address.zipcode}
              </span>
            </p>

            {/* Email */}
            {address.email && (
              <p className="text-xs text-gray-400 mt-0.5">{address.email}</p>
            )}
          </div>
        </div>

        {/* Kebab menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-10 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-36">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete();
                }}
                disabled={deleting}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="text-xs font-semibold text-[#2874f0] uppercase tracking-wide hover:underline transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="text-xs font-semibold text-red-500 uppercase tracking-wide hover:underline transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ManageAddresses() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);   // _id of address being edited
  const [deletingId, setDeletingId] = useState(null); // _id of address being deleted
  const [formLoading, setFormLoading] = useState(false);

  // ── Shared save logic (add + edit) ───────────────────────────────────────
  const persistAddresses = async (updatedAddresses, isEdit) => {
    try {
      setFormLoading(true);

      const result = await dispatch(
        updateUserThunk(user?.id, { address: updatedAddresses })
      );

      console.log(result, "result of updateUser in ManageAddresses");

      if (result?.data?.status === 200) {
        await dispatch(checkIfUserLoggedIn());
      }

      toast.success(
        isEdit ? "Address updated successfully" : "Address added successfully"
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // ── Add ──────────────────────────────────────────────────────────────────
  const handleAdd = async (formData) => {
    const updatedAddresses = [
      ...(user?.address || []),
      {
        name: formData.name,
        email: formData.email,
        tel: Number(formData.tel),
        locality: formData.locality,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        addresstype: formData.addresstype,
      },
    ];

    await persistAddresses(updatedAddresses, false);
    setShowAddForm(false);
  };

  // ── Edit ─────────────────────────────────────────────────────────────────
  const handleEdit = async (formData) => {
    const updatedAddresses = (user?.address || []).map((addr) =>
      addr.id === editingId || addr._id === editingId
        ? {
            ...addr,
            name: formData.name,
            email: formData.email,
            tel: Number(formData.tel),
            locality: formData.locality,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode,
            addresstype: formData.addresstype,
          }
        : addr
    );

    await persistAddresses(updatedAddresses, true);
    setEditingId(null);
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      const updatedAddresses = (user?.address || []).filter(
        (a) => a.id !== id && a._id !== id
      );

      const result = await dispatch(
        updateUserThunk(user?.id, { address: updatedAddresses })
      );

      console.log(result, "result of deleteAddress");

      if (result?.data?.status === 200) {
        await dispatch(checkIfUserLoggedIn());
      }

      toast.success("Address deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete address.");
    } finally {
      setDeletingId(null);
    }
  };

  const addresses = user?.address || [];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-900 mb-5">
          Manage Addresses
        </h1>

        {/* Add new address button — hide when any form is open */}
        {!showAddForm && editingId === null && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 mb-4 rounded-xl border border-dashed border-blue-300 bg-blue-50 text-[#2874f0] text-sm font-semibold hover:bg-blue-100 transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add a New Address
          </button>
        )}

        {/* Add form */}
        {showAddForm && (
          <AddressForm
            loading={formLoading}
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Address list */}
        {addresses.length === 0 && !showAddForm ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No saved addresses yet.
          </div>
        ) : (
          addresses.map((addr) => {
            const addrId = addr.id || addr._id;
            return editingId === addrId ? (
              <AddressForm
                key={addrId}
                initial={addr}
                loading={formLoading}
                onSave={handleEdit}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <AddressCard
                key={addrId}
                address={addr}
                deleting={deletingId === addrId}
                onEdit={() => {
                  setEditingId(addrId);
                  setShowAddForm(false);
                }}
                onDelete={() => handleDelete(addrId)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}