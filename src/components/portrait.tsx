export const defaultPortrait = 'https://lh3.googleusercontent.com/gg/AIJ2gl-C4Kc-wsIFfhy1_ffV7-s4srjwCRuFfPa0DkJcywGk40ZpqCFpb5QgG_ygWYo0EFqhR9AllZACK6NX8he8FlvNZfnokEzaConxGsOSYaDYxKaSe5umVoLOmY5pXb53ip-b2QTlPPs0rUhQ2rZvMLDbPYQYj7BOdhoVkjir9L6sQHOgxPc6=s1024-rj-mp2';

export const Portrait = ({ url }: { url?: string }) => (
  <div className="w-32 h-32 bg-slate-800 rounded-full mx-auto border-4 border-amber-600 mb-4 overflow-hidden">
             <img src={url || defaultPortrait} alt="Portrait" className="opacity-50" />
          </div>
);