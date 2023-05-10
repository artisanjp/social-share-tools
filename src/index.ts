/*
 * Twitter Share Buttons
 */
((window, document) => {

    const attach = () => {
        // Target Elements
        const TARGET_ATTRIBUTE = 'data-artisan-share', MEDIA_NAME = 'twitter';
        const elems = document.querySelectorAll<HTMLElement>(`[${ TARGET_ATTRIBUTE }='${ MEDIA_NAME }']`);

        // Define the callback
        const shareOnTwitter = () => {
            const titleTags = document.getElementsByTagName("title");
            const text = titleTags.length ? titleTags[0].innerHTML : '';
            const hashtags = 'artisan';
            const url = window.location.href;
            const intentUrl = new URL('https://twitter.com/intent/tweet');
            intentUrl.searchParams.append("text", text);
            intentUrl.searchParams.append('hashtags', hashtags);
            intentUrl.searchParams.append('url', url);
            window.open( intentUrl.href, '_blank', 'toolbar=no,titlebar=no,status=no,scrollbars=yes,resizable=yes,menubar=no,location=yes,width=550,height=420' );
        }

        // Attach the listener
        for (let i = 0; i < elems.length; i++) {
            const elem = elems[i];
            elem.addEventListener('click', (e: Event) => {
                e.preventDefault();
                shareOnTwitter();
            });
        };
    }

    // Execute attach() on dom ready.
    if (document.readyState === "complete") return attach();
    document.addEventListener('DOMContentLoaded', () => attach());

})(window, document);

/*
 * Copy Link Button & Toast Notification
 */
((window, document) => {

    const attach = () => {
        // Target Elements
        const TARGET_ATTRIBUTE = 'data-artisan-share', MEDIA_NAME = 'copy-link';
        const elems = document.querySelectorAll<HTMLElement>(`[${ TARGET_ATTRIBUTE }='${ MEDIA_NAME }']`);

        // Append Toast Notification Element
        // NOTE: Styles are in /src/styles/app.css
        const TOAST_CLASS_NAME = 'artisan-toast';
        const TOAST_ACTIVE_CLASS = 'is-active';
        const TOAST_DISMISS_CLASS = 'is-dismissing';
        const TOAST_DURATION = 2.5 * 1000;
        const TOAST_ANIMATION_DUATION = 100;
        // Create Toast Element
        const body = document.querySelector<HTMLBodyElement>('body');
        const toastDiv = document.createElement('div');
        toastDiv.classList.add( TOAST_CLASS_NAME );
        toastDiv.innerText = 'Link Copied!';
        toastDiv.setAttribute('aria-role', 'button');
        toastDiv.setAttribute('aria-label', 'close notification');
        body?.appendChild( toastDiv );

        // Toast Notification Util
        let dismissTimeoutId: number;
        const dismiss = () => {
            if (!toastDiv.classList.contains( TOAST_ACTIVE_CLASS )) return;
            clearTimeout(dismissTimeoutId);
            toastDiv.classList.add( TOAST_DISMISS_CLASS );
            toastDiv.classList.remove( TOAST_ACTIVE_CLASS );
            setTimeout(() => toastDiv.classList.remove( TOAST_DISMISS_CLASS ), TOAST_ANIMATION_DUATION);
        }
        const dismissWithDelay = () => {
            return setTimeout(dismiss, TOAST_DURATION);
        }
        const notify = (msg: string) => {
            toastDiv.innerText = msg;
            // if toast is already active, then extend it's life
            if (toastDiv.classList.contains( TOAST_ACTIVE_CLASS )) {
                clearTimeout( dismissTimeoutId );
                dismissTimeoutId = dismissWithDelay();
                return;
            }
            toastDiv.classList.add( TOAST_ACTIVE_CLASS );
            dismissTimeoutId = dismissWithDelay();
        }

        // Attach click to dismiss listener
        toastDiv.addEventListener('click', (e: Event) => {
            e.preventDefault();
            dismiss();
        });

        // Text Utility: Ellipsis
        const ELLIPSIS_STR = '...';
        const ellipsis = (text: string, length: number): string => {
            if (ELLIPSIS_STR.length >= length) return '';
            if (text.length <= length) return text;
            return text.slice(0, length - ELLIPSIS_STR.length);
        };

        // Clipboard Utility
        const copyText = async ({ text, toast = true }:{ text: string, toast: boolean }): Promise<void|string> => {
            if (!navigator.clipboard) return;
            if (!text) return;
            let err;
            await navigator.clipboard.writeText(text).catch(e => err = e);
            if (err) return;
            if (toast) notify('Link copied!');
            return text;
        };

        // Define the callback
        const copyPageInfo = () => {
            const titleTags = document.getElementsByTagName("title");
            const title = titleTags.length ? ellipsis(titleTags[0].innerHTML, 64) : '';
            const url = window.location.href;
            const hashtag = '#artisan';
            const text = `${title} ${url} ${hashtag}`;
            copyText({ text, toast: true });
        }

        // Attach the listener
        for (let i = 0; i < elems.length; i++) {
            const elem = elems[i];
            elem.addEventListener('click', (e: Event) => {
                e.preventDefault();
                copyPageInfo();
            });
        };
    }

    // Execute attach() on dom ready.
    if (document.readyState === "complete") return attach();
    document.addEventListener('DOMContentLoaded', () => attach());

})(window, document);

/*
 * Facebook Share button
 */
((window, document) => {
    
    const attach = () => {

        // Target Elements
        const TARGET_ATTRIBUTE = 'data-artisan-share', MEDIA_NAME = 'facebook';
        const elems = document.querySelectorAll<HTMLElement>(`[${ TARGET_ATTRIBUTE }='${ MEDIA_NAME }']`);

        // Define the callback
        const shareOnFacebook = () => {
            const url = window.location.href;
            const intentUrl = new URL('https://www.facebook.com/sharer/sharer.php');
            intentUrl.searchParams.append('u', url);
            intentUrl.searchParams.append('hashtag', 'artisan');
            window.open(  intentUrl.href, '_blank','');
        }

        // Attach the listener
        for (let i = 0; i < elems.length; i++) {
            const elem = elems[i];
            elem.addEventListener('click', (e: Event) => {
                e.preventDefault();
                shareOnFacebook();
            });
        };
    }

    // Execute attach() on dom ready.
    if (document.readyState === "complete") return attach();
    document.addEventListener('DOMContentLoaded', () => attach());

})(window, document);

/*
 * Reddit Share button
 */
((window, document) => {

    const attach = () => {
        // Target Elements
        const TARGET_ATTRIBUTE = 'data-artisan-share', MEDIA_NAME = 'reddit';
        const elems = document.querySelectorAll<HTMLElement>(`[${ TARGET_ATTRIBUTE }='${ MEDIA_NAME }']`);

        // Define the callback
        const shareOnReddit = () => {
            const titleTags = document.getElementsByTagName("title");
            const text = titleTags.length ? titleTags[0].innerHTML : '';
            const url = window.location.href;
            const intentUrl = new URL('http://www.reddit.com/submit');
            intentUrl.searchParams.append('url', url);
            intentUrl.searchParams.append('title', text);
            window.open( intentUrl.href, '_blank', 'toolbar=no,titlebar=no,status=no,scrollbars=yes,resizable=yes,menubar=no,location=yes,width=550,height=420' );
        }

        // Attach the listener
        for (let i = 0; i < elems.length; i++) {
            const elem = elems[i];
            elem.addEventListener('click', (e: Event) => {
                e.preventDefault();
                shareOnReddit();
            });
        };
    }

    // Execute attach() on dom ready.
    if (document.readyState === "complete") return attach();
    document.addEventListener('DOMContentLoaded', () => attach());

})(window, document);