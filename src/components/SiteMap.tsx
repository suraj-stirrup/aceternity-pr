// app/sitemap/page.tsx

export const metadata = {
  title: 'Sitemap',
  description: 'Overview of available pages',
};

export default function Sitemap() {
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Sign-Up', path: '/user/signup' },
    { name: 'Login', path: '/user/signin' },
    { name: 'Report Form', path: '/reportform-page' },
    { name: 'Blog', path: '/blog' },
    // Add more pages as needed
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
      <ul className="space-y-4">
        {routes.map((route) => (
          <li key={route.path}>
            <a
              href={route.path}
              className="text-blue-600 hover:underline text-lg"
            >
              {route.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
