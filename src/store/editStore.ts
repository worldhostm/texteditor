// stores/useStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EditState {
  count: number
  increase: () => void
  decrease: () => void
  reset: () => void
  authtoken:string
  setAuthToken:(token:string)=>void
  username : string
  login : (username:string)=>void
}

export const useEditStore = create<EditState>()(
  persist(
    (set) => ({
      count: 0,
      authtoken:'',
      username:'',
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      setAuthToken:(token:string)=>set({authtoken:token}),
      login : (username:string)=>set(({username}))
    }),
    {
      name: 'edit-store', // localStorage 키 이름
    }
  )
)
