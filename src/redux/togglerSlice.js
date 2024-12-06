import { createSlice } from '@reduxjs/toolkit';

const sideBarToggler = createSlice({
  name: 'sidebarToggler',
  initialState: {
    isOpen: false,  // initial state of the sidebar (closed)
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;  // toggles between true and false
    },
    openSidebar: (state) => {
      state.isOpen = true;  // explicitly open the sidebar
    },
    closeSidebar: (state) => {
      state.isOpen = false;  // explicitly close the sidebar
    }
  }
});

export const { toggleSidebar, openSidebar, closeSidebar } = sideBarToggler.actions;

export default sideBarToggler.reducer;
