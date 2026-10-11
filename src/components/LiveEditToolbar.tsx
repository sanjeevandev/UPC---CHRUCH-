import React from 'react';
import { Save, Plus, X, Sparkles } from 'lucide-react';

interface LiveEditToolbarProps {
  onAddEvent: () => void;
  onSaveAndExit: () => void;
  onCancel: () => void;
  hasUnsavedChanges?: boolean;
}

export const LiveEditToolbar: React.FC<LiveEditToolbarProps> = ({
  onAddEvent,
  onSaveAndExit,
  onCancel,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-neutral-950/95 backdrop-blur-md text-white border-2 border-[#dd5234] p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-bounce-in">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Pastor Live Edit Active</span>
          </div>
          <p className="text-[11px] text-neutral-300">
            Click directly on any event card to edit text, dates, or times
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={onAddEvent}
          className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
          title="Add a new upcoming gathering"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>Add Event</span>
        </button>

        <button
          onClick={onSaveAndExit}
          className="bg-[#dd5234] hover:bg-[#b1422a] text-white text-xs px-4 py-2 font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
          title="Save all changes and lock website"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save & Lock</span>
        </button>

        <button
          onClick={onCancel}
          className="text-neutral-400 hover:text-white p-2 transition-colors cursor-pointer"
          title="Exit without saving"
          aria-label="Exit Live Edit"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
