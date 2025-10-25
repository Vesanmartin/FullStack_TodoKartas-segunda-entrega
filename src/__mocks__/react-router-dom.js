import React from "react";
//Mock de react router dom para test
export const MemoryRouter = ({ children }) => <>{children}</>;
export const Link = ({ children, to }) => <a href={to}>{children}</a>;