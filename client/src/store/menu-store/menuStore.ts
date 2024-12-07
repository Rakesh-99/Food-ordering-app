import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { axiosMenuInstance } from '../../axiosInstances/axiosApis';
import { toast } from 'sonner';


type Menu = {
    _id: string,
    name: string,
    image: string,
    price: number,
    description: string
}[];

type MenuType = {
    loading: boolean,
    menus: Menu[] | null,
    createMenu: (menuInfos: FormData) => Promise<void>,
    updateMenu: (menuId: string, menuInfo: FormData) => Promise<void>
    getMenus: () => Promise<void>
    getMenu: (menuId: string) => Promise<void>,
    selectedMenu: Menu | null
}

const useMenuStore = create<MenuType>()(persist((set) => ({

    loading: false,
    menus: null,
    selectedMenu: null,

    // Create menu : 
    createMenu: async (menuInfos: FormData) => {

        try {
            set({ loading: true })
            const menuResponse = await axiosMenuInstance.post('/create-menu', menuInfos);
            const data = await menuResponse.data;
            if (data.success) {
                set((state) => ({
                    loading: false,
                    menus: state.menus ? [...state.menus, data.menu] : [data.menu]
                }))
                toast.success(data.message);
            }
        } catch (error: any) {
            set({ loading: false })
            const errMessage = error?.response?.data?.message;
            toast.error(errMessage)
        }
    },

    // Get all menu : 
    getMenus: async () => {
        try {
            set({ loading: true });
            const getAllMenuResponse = await axiosMenuInstance.get('/get-menus');
            const data = await getAllMenuResponse.data;
            if (data.success) {
                set({ loading: false, menus: data.menus });
            }
        } catch (error: any) {
            set({ loading: false });
            const errMessage = error?.response?.data.message;
            toast.error(errMessage);
        }
    },

    // Get single menu : 
    getMenu: async (menuId: string) => {

        try {
            set({ loading: true });
            const getSingleMenuResponse = await axiosMenuInstance.get(`/get-menu/${menuId}`);
            const data = await getSingleMenuResponse.data;

            if (data.success) {
                set({ loading: false, selectedMenu: data.menu });
            }
        } catch (error: any) {
            set({ loading: false });
            const errMessage = error?.response?.data.message;
            toast.error(errMessage);
        }
    },


    // Update menu : 
    updateMenu: async (menuId: string, menuInfo: FormData) => {
        try {
            set({ loading: true });
            const updateMenuResponse = await axiosMenuInstance.put(`/update-menu/${menuId}`, menuInfo);
            const data = await updateMenuResponse.data;
            if (data.success) {
                set((state) => ({
                    loading: false,
                    menus: state.menus?.map((menu) => menu._id === menuId ? { ...menu, ...data.menu } : menu)
                }))
            }
        } catch (error: any) {
            set({ loading: false });
            const errMessage = error.response.data.message;
            toast.error(errMessage)
        }
    }
})

    ,
    {
        name: "useMenuStore",
        storage: createJSONStorage(() => localStorage)
    }
));



export default useMenuStore;