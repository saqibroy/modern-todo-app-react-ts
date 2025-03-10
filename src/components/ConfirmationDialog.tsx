import React from 'react'
import { ConfirmationDialogProps } from '../types/types'

const ConfirmationDialog = React.memo(({ isOpen, onConfirm, onCancel, title, message }: ConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 id="confirm-dialog-title" className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
        <p id="confirm-dialog-message" className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            autoFocus
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

export default ConfirmationDialog;
