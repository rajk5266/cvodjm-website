'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  Menu,
  X,
  Download,
  User,
  LogOut,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import LanguageSwitcher from '@/app/[lang]/components/ui/LanguageSwitcher'

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface NavItem {
  title: string
  href: string
  type?: 'single' | 'dropdown'
  children?: NavItem[]
}

interface NavbarProps {
  lang: string
  navItems: NavItem[]
  profileMenu?: NavItem[]
}

/* -------------------------------------------------------------------------- */
/*                         DESKTOP RECURSIVE MENU                              */
/* -------------------------------------------------------------------------- */

interface DesktopNavItemProps {
  item: NavItem
  lang: string
  path: string
  openPath: string | null
  setOpenPath: React.Dispatch<React.SetStateAction<string | null>>
}

const DesktopNavItem = ({
  item,
  lang,
  path,
  openPath,
  setOpenPath,
}: DesktopNavItemProps) => {
  const buildHref = (href: string) => {
    if (!href || href === '#') return '#'
    if (href.startsWith('http')) return href
    return `/${lang}${href.startsWith('/') ? href : `/${href}`}`
  }

  const hasChildren = !!item.children?.length
  const isOpen = openPath === path
  const isAncestorOpen = openPath?.startsWith(`${path}>`) ?? false
  const shouldShow = isOpen || isAncestorOpen

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (hasChildren) {
          setOpenPath(path)
        }
      }}
      onMouseLeave={() => {
        if (hasChildren) {
          setOpenPath((curr) => (curr === path ? null : curr))
        }
      }}
    >
      {hasChildren && item.type === 'dropdown' ? (
        <>
          <button
            type="button"
            aria-expanded={shouldShow}
            className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <span>{item.title}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                shouldShow ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`absolute left-0 top-full mt-1 min-w-[220px] rounded-lg border bg-white shadow-lg z-50 transition-all
              ${
                shouldShow
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
              }`}
          >
            <div className="py-2">
              {item.children!.map((child) => {
                const childPath = `${path}>${child.title}`
                const childHasChildren = !!child.children?.length
                const childIsOpen = openPath === childPath
                const childAncestorOpen =
                  openPath?.startsWith(`${childPath}>`) ?? false

                return (
                  <div
                    key={childPath}
                    className="relative"
                    onMouseEnter={() => {
                      if (childHasChildren) {
                        setOpenPath(childPath)
                      }
                    }}
                    onMouseLeave={() => {
                      if (childHasChildren) {
                        setOpenPath((curr) =>
                          curr === childPath ? null : curr
                        )
                      }
                    }}
                  >
                    {childHasChildren ? (
                      <>
                        <div className="flex items-center justify-between px-4 py-2 cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                          <span>{child.title}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              childIsOpen || childAncestorOpen
                                ? 'rotate-90'
                                : ''
                            }`}
                          />
                        </div>

                        <div
                          className={`absolute left-full top-0 ml-1 min-w-[220px] rounded-lg border bg-white shadow-lg z-50 transition-all
                            ${
                              childIsOpen || childAncestorOpen
                                ? 'opacity-100 visible translate-x-0'
                                : 'opacity-0 invisible -translate-x-2'
                            }`}
                        >
                          <div className="py-2">
                            {child.children!.map((sub) => {
                              const subPath = `${childPath}>${sub.title}`
                              const subHasChildren =
                                !!sub.children?.length

                              return subHasChildren ? (
                                <DesktopNavItem
                                  key={subPath}
                                  item={sub}
                                  lang={lang}
                                  path={subPath}
                                  openPath={openPath}
                                  setOpenPath={setOpenPath}
                                />
                              ) : (
                                <Link
                                  key={subPath}
                                  href={buildHref(sub.href)}
                                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                >
                                  {sub.title}
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={buildHref(child.href)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {child.title}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <Link
          href={buildHref(item.href)}
          className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
        >
          {item.title}
        </Link>
      )}
    </div>
  )
}


/* -------------------------------------------------------------------------- */
/*                                MOBILE MENU                                 */
/* -------------------------------------------------------------------------- */

interface MobileNavItemProps {
  item: NavItem
  lang: string
  path: string
  openPaths: Set<string>
  togglePath: (p: string) => void
  closeMenu: () => void
}

const MobileNavItem = ({
  item,
  lang,
  path,
  openPaths,
  togglePath,
  closeMenu,
}: MobileNavItemProps) => {
  const buildHref = (href: string) => {
    if (!href || href === '#') return '#'
    if (href.startsWith('http')) return href
    return `/${lang}${href.startsWith('/') ? href : `/${href}`}`
  }

  const hasChildren = !!item.children?.length
  const isOpen = openPaths.has(path)

  return (
    <div>
      {hasChildren && item.type === 'dropdown' ? (
        <>
          <button
            onClick={() => togglePath(path)}
            className="flex w-full items-center justify-between px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
          >
            <span className="font-medium">{item.title}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`ml-3 space-y-1 transition-all ${
              isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            {item.children!.map((child) => (
              <MobileNavItem
                key={`${path}>${child.title}`}
                item={child}
                lang={lang}
                path={`${path}>${child.title}`}
                openPaths={openPaths}
                togglePath={togglePath}
                closeMenu={closeMenu}
              />
            ))}
          </div>
        </>
      ) : (
        <Link
          href={buildHref(item.href)}
          onClick={closeMenu}
          className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-lg"
        >
          {item.title}
        </Link>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   NAVBAR                                   */
/* -------------------------------------------------------------------------- */

const Navbar = ({ lang, navItems, profileMenu }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openPaths, setOpenPaths] = useState<Set<string>>(new Set())
  const [openPath, setOpenPath] = useState<string | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { isAuthenticated, logout } = useAuthStore()

  const togglePath = (path: string) => {
    setOpenPaths((prev) => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    })
  }

  const closeMenu = () => {
    setIsOpen(false)
    setOpenPaths(new Set())
    setOpenPath(null)
    setIsProfileOpen(false)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white border-b shadow">
        {/* TOP BAR */}
        <div className="flex h-14 items-center justify-between px-4 lg:px-8">
          <Link href={`/${lang}`} className="text-2xl font-bold text-blue-600">
            Logo
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="dropdown" />

            {isAuthenticated && profileMenu ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen((p) => !p)}
                  className="flex items-center gap-1 text-gray-700"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                    {profileMenu.map((item) =>
                      item.title === 'Logout' ? (
                        <button
                          key={item.title}
                          onClick={() => {
                            logout()
                            closeMenu()
                          }}
                          className="flex w-full items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      ) : (
                        <Link
                          key={item.title}
                          href={`/${lang}${item.href}`}
                          onClick={closeMenu}
                          className="block px-4 py-3 hover:bg-blue-50"
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={`/${lang}/login`}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsOpen((o) => !o)}
              className="lg:hidden"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex justify-center gap-6 py-2">
          {navItems.map((item) => (
            <DesktopNavItem
              key={item.title}
              item={item}
              lang={lang}
              path={item.title}
              openPath={openPath}
              setOpenPath={setOpenPath}
            />
          ))}
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden px-4 py-2">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.title}
                item={item}
                lang={lang}
                path={item.title}
                openPaths={openPaths}
                togglePath={togglePath}
                closeMenu={closeMenu}
              />
            ))}
          </div>
        )}
      </nav>

      {/* FLOATING BUTTON */}
      <button className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-4 text-white shadow-lg">
        <Download />
      </button>
    </>
  )
}

export default Navbar
