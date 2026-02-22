import React from "react";
import { Clock, CheckCircle, XCircle, ShoppingCart, Trash2, Package } from "lucide-react";

const statusStyles = {
  Pending: { color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
  Accepted: { color: "text-blue-600", bg: "bg-blue-50", icon: ShoppingCart },
  Delivered: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle },
  Canceled: { color: "text-rose-600", bg: "bg-rose-50", icon: XCircle },
};

const OrderCard = ({ order, onRemove }) => {
  const status = statusStyles[order.status] || { color: "text-gray-600", bg: "bg-gray-50", icon: Package };
  const StatusIcon = status.icon;

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Header: ID and Status */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Order Reference</p>
            <p className="font-mono text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">#{order._id.slice(-8)}</p>
          </div>
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${status.bg} ${status.color}`}>
            <StatusIcon size={14} />
            {order.status}
          </span>
        </div>

        {/* Items List */}
        <div className="space-y-3 mb-6">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 text-gray-600 text-xs font-bold">
                  {item.quantity}
                </span>
                <span className="font-medium text-gray-800">{item.food?.name || "Deleted Item"}</span>
              </div>
              <span className="text-gray-500 font-medium">
                ${((item.food?.price || 0) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer: Total and Actions */}
        <div className="pt-5 border-t border-gray-50 flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-400 mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">${order.totalPrice.toFixed(2)}</p>
          </div>
          
          {order.status === "Delivered" && (
            <button
              onClick={() => onRemove(order._id)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-colors duration-200 group-hover:opacity-100"
            >
              <Trash2 size={18} />
              <span className="text-sm font-semibold">Archive</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;