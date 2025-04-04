<script lang="ts">
	import { onMount } from 'svelte';

	type Message = {
		text: string;
		sender: 'user' | 'bot';
	};

	let messages = $state<Array<Message>>([]);
	let newMessage = $state('');
	let chatContainer: HTMLElement;
	async function getReply(message: string): Promise<string> {
		const formData = new FormData();
		formData.append('msg', message);

		const response = await fetch('http://127.0.0.1:5000/getReply', {
			method: 'POST',
			body: formData
		});

		return response.text();
	}

	function renderMathJax() {
		if (window.MathJax) {
			window.MathJax.typesetPromise([chatContainer]).catch((err: any) =>
				console.error('MathJax error:', err)
			);
		}
	}

	async function sendMessage() {
		if (!newMessage.trim()) return;

		messages = [...messages, { text: newMessage, sender: 'user' }]; //Adds to chat
		const userMessage = newMessage;
		newMessage = ''; //Reset text box

		setTimeout(async () => {
			try {
				let reply = await getReply(userMessage);

				messages = [...messages, { text: reply, sender: 'bot' }];
			} catch (error) {
				console.error('Error getting reply:', error);
				messages = [...messages, { text: "I'm having trouble responding!", sender: 'bot' }];
			}

			// Scroll to bottom
			setTimeout(() => {
				if (chatContainer) {
					chatContainer.scrollTop = chatContainer.scrollHeight;
				}
			}, 0);
			setTimeout(renderMathJax, 0);
		}, 500);
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			sendMessage();
		}
	}

	onMount(() => {
		const existingScript = document.getElementById('MathJax-script');
		if (existingScript) {
			existingScript.remove();
		}

		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
		script.async = true;
		script.id = 'MathJax-script';

		// Configure MathJax
		window.MathJax = {
			tex: {
				inlineMath: [
					['$', '$'],
					['\\(', '\\)']
				],
				displayMath: [
					['$$', '$$'],
					['\\[', '\\]']
				]
			},
			svg: {
				fontCache: 'global'
			},
			options: {
				renderActions: {
					addMenu: [],
					checkLoading: []
				}
			},
			startup: {
				ready: () => {
					window.MathJax.startup.defaultReady();
					renderMathJax(); // Initial rendering
				}
			}
		};
		document.head.appendChild(script);

		return () => {
			if (document.getElementById('MathJax-script')) {
				document.getElementById('MathJax-script').remove();
			}
		};
	});
	$effect(() => {
		if (messages.length) {
			setTimeout(renderMathJax, 0);
		}
	});
</script>

<svelte:head>
	<title>Chat Bot</title>
	<meta name="description" content="Chat with our bot" />
</svelte:head>
<div
	class="mx-auto my-5 flex h-[80vh] max-w-2xl flex-col rounded-lg border border-gray-200 bg-white"
>
	<div class="flex-1 overflow-y-auto p-5" bind:this={chatContainer}>
		{#each messages as message}
			<div class="mb-3 flex {message.sender === 'user' ? 'justify-end' : ''}">
				<div
					class=" inline-block max-w-[70%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2 {message.sender ===
					'user'
						? 'bg-sky-500 text-white'
						: 'bg-gray-100'}"
				>
					{@html message.text}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex gap-2 border-t border-gray-200 p-5">
		<input
			type="text"
			bind:value={newMessage}
			onkeydown={handleKeydown}
			placeholder="Type your message..."
			class="focus:ring-primary flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2"
		/>
		<button
			onclick={sendMessage}
			class="rounded-md bg-sky-500 px-4 py-2 text-white transition-opacity hover:opacity-90"
		>
			Send
		</button>
	</div>
</div>
