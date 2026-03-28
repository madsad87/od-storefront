export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e2dc', background: '#fff' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '1rem' }}>
        <small>© {new Date().getFullYear()} OD Storefront</small>
      </div>
    </footer>
  );
}
