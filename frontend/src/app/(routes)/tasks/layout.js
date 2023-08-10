"use client";

import WithAuth from "@/app/HOCs/with-auth";

function TaskLayout({ children }) {
  return children;
}

export default WithAuth(TaskLayout);
