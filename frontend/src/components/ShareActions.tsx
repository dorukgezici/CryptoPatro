import { useEffect, useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { api, errorMessage, type Share } from '../lib/api';
import { downloadPostcard } from './Postcard';
export default function ShareActions({ share }: { share: Share }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    void record('share_view');
  }, [share.slug]);
  async function record(name: string) {
    await api('/events', {
      method: 'POST',
      body: { name, referral: share.slug },
      token: null,
    }).catch(() => {});
  }
  return (
    <>
      <div className="share-page-actions">
        <button
          className="button secondary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              void record('share_copy');
            } catch {
              setError('Copy this page’s address from your browser to share it.');
            }
          }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <button
          className="button secondary"
          onClick={async () => {
            try {
              await downloadPostcard(share);
              void record('share_download');
            } catch (e) {
              setError(errorMessage(e));
            }
          }}
        >
          <Download size={15} />
          Save postcard
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
