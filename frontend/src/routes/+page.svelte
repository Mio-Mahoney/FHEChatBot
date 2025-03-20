<script lang="ts">
	import { onMount } from 'svelte';

	type Message = {
		text: string;
		sender: 'user' | 'bot';
	};

	let latex = '<img src="https://latex.codecogs.com/svg.image?\frac{a}{b}" title="\frac{a}{b}" />';

	let messages: Array<Message> = [];
	let newMessage = '';
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

	async function sendMessage() {
		if (!newMessage.trim()) return;

		messages = [...messages, { text: newMessage, sender: 'user' }]; //Adds to chat
		const userMessage = newMessage;
		newMessage = ''; //Reset text box

		setTimeout(async () => {
			try {
				let reply = await getReply(userMessage);
				// const reply = 'hi';

				// Latex Logic
				if (reply == 'EQ1') reply = latex;
				else if (reply == 'EQ2') reply = latex;

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
		}, 500);
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			sendMessage();
		}
	}

	// Load the RiveScript file on component mount
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
					class="max-w-[70%] rounded-2xl px-4 py-2 {message.sender === 'user'
						? 'bg-sky-500 text-white'
						: 'bg-gray-100'}"
				>
					{message.text}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex gap-2 border-t border-gray-200 p-5">
		<input
			type="text"
			bind:value={newMessage}
			on:keydown={handleKeydown}
			placeholder="Type your message..."
			class="focus:ring-primary flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2"
		/>
		<button
			on:click={sendMessage}
			class="rounded-md bg-sky-500 px-4 py-2 text-white transition-opacity hover:opacity-90"
		>
			Send
		</button>
	</div>
</div>
