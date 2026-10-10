import React, { useState, useEffect } from 'react';
import {
  type ChurchEvent,
  getSavedEvents,
  saveEvents,
  resetEventsToDefault,
  getAdminPIN,
  saveAdminPIN
} from '../data/eventsData';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  KeyRound,
  Eye,
  LogOut
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('upc_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'settings'>('list');

  // Event list state
  const [events, setEvents] = useState<ChurchEvent[]>(getSavedEvents);

  // Form State for Add / Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<ChurchEvent['category']>('Special Gathering');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formLocation, setFormLocation] = useState('UPC Main Sanctuary, Bodi');
  const [formSpeaker, setFormSpeaker] = useState('Pastor Rajan Joel');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatured, setFormFeatured] = useState(true);

  // PIN settings state
  const [newPin, setNewPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  // Toast / Status Message
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEvents(getSavedEvents());
      const authed = sessionStorage.getItem('upc_admin_auth') === 'true';
      setIsAuthenticated(authed);
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getAdminPIN();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('upc_admin_auth', 'true');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('upc_admin_auth');
    setPinInput('');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCategory('Special Gathering');
    setFormDate('');
    setFormTime('');
    setFormLocation('UPC Main Sanctuary, Bodi');
    setFormSpeaker('Pastor Rajan Joel');
    setFormDescription('');
    setFormFeatured(true);
  };

  const handleStartEdit = (evt: ChurchEvent) => {
    setEditingId(evt.id);
    setFormTitle(evt.title);
    setFormCategory(evt.category);
    setFormDate(evt.date);
    setFormTime(evt.time);
    setFormLocation(evt.location);
    setFormSpeaker(evt.speakerOrLead || '');
    setFormDescription(evt.description);
    setFormFeatured(!!evt.featured);
    setActiveTab('add');
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDate.trim() || !formTime.trim()) {
      alert("Please fill in Title, Date, and Time.");
      return;
    }

    let updatedList: ChurchEvent[];
    if (editingId) {
      // Update existing
      updatedList = events.map(evt => {
        if (evt.id === editingId) {
          return {
            ...evt,
            title: formTitle.trim(),
            category: formCategory,
            date: formDate.trim(),
            time: formTime.trim(),
            location: formLocation.trim() || 'UPC Sanctuary, Bodi',
            speakerOrLead: formSpeaker.trim() || undefined,
            description: formDescription.trim(),
            featured: formFeatured
          };
        }
        return evt;
      });
      showToast("Event updated successfully!");
    } else {
      // Create new
      const newEvt: ChurchEvent = {
        id: `evt-${Date.now()}`,
        title: formTitle.trim(),
        category: formCategory,
        date: formDate.trim(),
        time: formTime.trim(),
        location: formLocation.trim() || 'UPC Sanctuary, Bodi',
        speakerOrLead: formSpeaker.trim() || undefined,
        description: formDescription.trim(),
        featured: formFeatured
      };
      updatedList = [newEvt, ...events];
      showToast("New event published!");
    }

    setEvents(updatedList);
    saveEvents(updatedList);
    handleResetForm();
    setActiveTab('list');
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the event:\n"${title}"?`)) {
      const filtered = events.filter(e => e.id !== id);
      setEvents(filtered);
      saveEvents(filtered);
      showToast("Event deleted.");
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Reset all events back to original church templates? Your custom events will be replaced.")) {
      const res = resetEventsToDefault();
      setEvents(res);
      showToast("Reset to default church schedule.");
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `upc_bodi_events_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Events backup file downloaded!");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          setEvents(parsed);
          saveEvents(parsed);
          showToast(`Imported ${parsed.length} events successfully!`);
        } else {
          alert("Invalid events file format.");
        }
      } catch (err) {
        alert("Failed to read file. Please ensure it is a valid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      alert("PIN must be at least 4 characters long.");
      return;
    }
    const ok = saveAdminPIN(newPin.trim());
    if (ok) {
      setPinSuccessMsg("Admin PIN updated successfully!");
      setNewPin('');
      setTimeout(() => setPinSuccessMsg(''), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl z-10 border-t-4 border-[#dd5234] flex flex-col my-auto">
        
        {/* Top Header */}
        <div className="bg-[#111111] text-white p-4 sm:p-5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#dd5234] text-white flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base sm:text-lg uppercase tracking-wider text-white">
                UPC Bodi • Staff & Events Portal
              </h2>
              <p className="text-[11px] text-neutral-400">
                Manage upcoming gatherings, celebrations, and church calendar with zero code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Logout from Staff Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1.5 transition-colors cursor-pointer"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-1">
          {!isAuthenticated ? (
            /* PIN Screen */
            <div className="max-w-md mx-auto py-8 sm:py-12 text-center">
              <div className="w-16 h-16 bg-[#f7f2e7] text-[#dd5234] mx-auto flex items-center justify-center rounded-full mb-4">
                <KeyRound className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-neutral-900 mb-2">
                Pastor & Admin Authentication
              </h3>
              <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                Please enter the church administration PIN to manage upcoming events, youth gatherings, and special services.
              </p>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Admin Security PIN
                  </label>
                  <input
                    type="password"
                    placeholder="Enter security PIN"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    autoFocus
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-center text-lg tracking-widest font-mono"
                  />
                  {pinError && (
                    <p className="text-xs text-red-600 font-semibold mt-1.5 text-center">
                      Incorrect security PIN. Please try again.
                    </p>
                  )}
                  <p className="text-[11px] text-neutral-400 mt-2 text-center">
                    Default PIN: <code className="bg-neutral-100 px-1.5 py-0.5 font-bold text-neutral-700">upcbodi2026</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#111111] hover:bg-[#dd5234] text-white py-3 font-heading font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-md"
                >
                  Unlock Events Portal
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Portal Interface */
            <div>
              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-200 mb-6">
                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('list');
                  }}
                  className={`pb-3 px-4 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'list'
                      ? 'border-[#dd5234] text-[#dd5234]'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>All Events ({events.length})</span>
                </button>

                <button
                  onClick={() => {
                    if (activeTab !== 'add') handleResetForm();
                    setActiveTab('add');
                  }}
                  className={`pb-3 px-4 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'add'
                      ? 'border-[#dd5234] text-[#dd5234]'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingId ? 'Edit Event' : 'Add New Event'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`pb-3 px-4 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ml-auto ${
                    activeTab === 'settings'
                      ? 'border-[#dd5234] text-[#dd5234]'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Settings & Backup</span>
                </button>
              </div>

              {/* TAB 1: LIST OF EVENTS */}
              {activeTab === 'list' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-neutral-600">
                      These events are actively published on the live church website homepage.
                    </p>
                    <button
                      onClick={() => {
                        handleResetForm();
                        setActiveTab('add');
                      }}
                      className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Event</span>
                    </button>
                  </div>

                  {events.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-neutral-200">
                      <Calendar className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-neutral-700">No upcoming events listed</p>
                      <p className="text-xs text-neutral-500 mb-4">Click below to add a special gathering or restore defaults.</p>
                      <button
                        onClick={handleResetToDefaults}
                        className="bg-neutral-800 text-white text-xs px-3 py-1.5 font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Restore Church Defaults
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {events.map((evt) => (
                        <div
                          key={evt.id}
                          className="bg-[#f7f2e7] p-4 sm:p-5 border-l-4 border-[#dd5234] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-white text-[#dd5234] px-2 py-0.5 border border-[#dd5234]/30 shadow-xs">
                                {evt.category}
                              </span>
                              {evt.featured && (
                                <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-black text-amber-300 px-2 py-0.5 flex items-center gap-1">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>Featured</span>
                                </span>
                              )}
                              <span className="text-xs text-neutral-700 font-semibold flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#dd5234]" />
                                {evt.date}
                              </span>
                              <span className="text-xs text-neutral-700 font-medium flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                                {evt.time}
                              </span>
                            </div>

                            <h4 className="font-heading font-bold text-base sm:text-lg uppercase text-neutral-900">
                              {evt.title}
                            </h4>

                            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                              {evt.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 pt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#dd5234]" />
                                {evt.location}
                              </span>
                              {evt.speakerOrLead && (
                                <span>Leader/Speaker: <strong>{evt.speakerOrLead}</strong></span>
                              )}
                            </div>
                          </div>

                          <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-200">
                            <button
                              onClick={() => handleStartEdit(evt)}
                              className="flex-1 sm:flex-none bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            >
                              <Edit2 className="w-3 h-3 text-blue-600" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(evt.id, evt.title)}
                              className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3 h-3 text-red-600" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ADD / EDIT EVENT */}
              {activeTab === 'add' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Form Column */}
                  <form onSubmit={handleSaveEvent} className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="font-heading font-bold text-sm uppercase text-neutral-900">
                        {editingId ? 'Edit Event Details' : 'Add New Church Gathering'}
                      </h4>
                      {editingId && (
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="text-xs text-[#dd5234] underline cursor-pointer"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Special Youth Revival Night"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-sm"
                      />
                    </div>

                    {/* Category & Featured */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Category Badge
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as ChurchEvent['category'])}
                          className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-xs bg-white"
                        >
                          <option value="Special Gathering">Special Gathering</option>
                          <option value="Celebration">Celebration</option>
                          <option value="Youth Night">Youth Night</option>
                          <option value="Fasting & Prayer">Fasting & Prayer</option>
                          <option value="Worship Concert">Worship Concert</option>
                          <option value="Sunday Service">Sunday Service</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 pt-5">
                        <input
                          type="checkbox"
                          id="featuredToggle"
                          checked={formFeatured}
                          onChange={(e) => setFormFeatured(e.target.checked)}
                          className="w-4 h-4 text-[#dd5234] rounded accent-[#dd5234]"
                        />
                        <label htmlFor="featuredToggle" className="text-xs font-bold text-neutral-800 cursor-pointer">
                          Highlight as Featured Event
                        </label>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Date *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sunday, Nov 22, 2026"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Time *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 6:00 PM – 8:30 PM"
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-xs"
                        />
                      </div>
                    </div>

                    {/* Location & Speaker */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Location / Campus
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. UPC Main Sanctuary, Bodi"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Minister / Speaker (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Pastor Rajan Joel"
                          value={formSpeaker}
                          onChange={(e) => setFormSpeaker(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-xs"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Short Description / Purpose
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe what this gathering is about..."
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-xs"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#111111] hover:bg-[#dd5234] text-white py-3 font-heading font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-md"
                      >
                        {editingId ? 'Update & Save Changes' : 'Publish Event to Website'}
                      </button>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </form>

                  {/* Live Preview Column */}
                  <div className="lg:col-span-5 bg-[#f7f2e7] p-5 border-t-4 border-[#dd5234]">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#dd5234] mb-3">
                      <Eye className="w-4 h-4" />
                      <span>Live Website Card Preview</span>
                    </div>

                    <div className="bg-white p-5 shadow-sm border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-[#f7f2e7] text-[#dd5234] px-2 py-0.5 border border-[#dd5234]/30">
                          {formCategory}
                        </span>
                        {formFeatured && (
                          <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-black text-amber-300 px-2 py-0.5">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-lg uppercase text-neutral-900">
                        {formTitle || 'Sample Event Title'}
                      </h3>

                      <div className="space-y-1 text-xs text-neutral-700">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#dd5234]" />
                          <span className="font-semibold">{formDate || 'Date: To Be Announced'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{formTime || 'Time: 9:00 AM'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{formLocation || 'UPC Main Sanctuary, Bodi'}</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-600 border-t pt-2 leading-relaxed">
                        {formDescription || 'Event description will appear here on the homepage.'}
                      </p>

                      {formSpeaker && (
                        <p className="text-[11px] text-neutral-500 italic">
                          Led by: {formSpeaker}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SETTINGS & BACKUP */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl mx-auto py-2">
                  {/* Change PIN Box */}
                  <div className="bg-[#f7f2e7] p-5 border-l-4 border-[#dd5234]">
                    <h4 className="font-heading font-bold text-sm uppercase text-neutral-900 mb-1">
                      Change Admin Security PIN
                    </h4>
                    <p className="text-xs text-neutral-600 mb-4">
                      Set a secure PIN for church staff and leadership to prevent unauthorized edits.
                    </p>

                    <form onSubmit={handleChangePin} className="flex gap-2 max-w-md">
                      <input
                        type="text"
                        placeholder="Enter new 4+ digit PIN"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="flex-1 px-3 py-2 border border-neutral-300 focus:outline-none focus:border-[#dd5234] text-xs font-mono bg-white"
                      />
                      <button
                        type="submit"
                        className="bg-[#111111] hover:bg-[#dd5234] text-white px-4 py-2 font-heading font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                      >
                        Save PIN
                      </button>
                    </form>
                    {pinSuccessMsg && (
                      <p className="text-xs text-emerald-600 font-semibold mt-2">{pinSuccessMsg}</p>
                    )}
                  </div>

                  {/* Backup & Restore */}
                  <div className="bg-white p-5 border border-neutral-200 shadow-sm space-y-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm uppercase text-neutral-900 mb-1">
                        Backup & Transfer Events Data
                      </h4>
                      <p className="text-xs text-neutral-600">
                        Download a backup file of all upcoming church events to your computer or upload on another device.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleExportJSON}
                        className="bg-neutral-900 hover:bg-[#dd5234] text-white px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Backup (.JSON)</span>
                      </button>

                      <label className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors border border-neutral-300">
                        <Upload className="w-4 h-4" />
                        <span>Restore from File</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportJSON}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset to Defaults */}
                  <div className="bg-red-50 p-5 border border-red-200 space-y-2">
                    <h4 className="font-heading font-bold text-sm uppercase text-red-800">
                      Reset All Events to Church Defaults
                    </h4>
                    <p className="text-xs text-red-600 leading-relaxed">
                      This will replace all events with the official default UPC Bodi schedule (Harvest Festival, All-Night Prayer, Youth Night).
                    </p>
                    <button
                      onClick={handleResetToDefaults}
                      className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Default Events</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-100 px-4 py-3 flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-200">
          <span>United Pentecostal Church, Bodi • Administrator Suite</span>
          <button
            onClick={onClose}
            className="text-neutral-700 hover:text-black font-semibold uppercase tracking-wider cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
