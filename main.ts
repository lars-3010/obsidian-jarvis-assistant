import { Plugin, Notice } from 'obsidian';

interface RAGSettings {
    companionUrl: string;
}

const DEFAULT_SETTINGS: RAGSettings = {
    companionUrl: 'http://localhost:8000'
}

export default class RAGPlugin extends Plugin {
    settings: RAGSettings;

    async onload() {
        await this.loadSettings();

        // Test-Button im Ribbon
        this.addRibbonIcon('brain', 'Test RAG Connection', async () => {
            try {
                const response = await fetch(`${this.settings.companionUrl}/health`);
                if (response.ok) {
                    new Notice('Companion App is connected! 🎉');
                }
            } catch (error) {
                new Notice('Failed to connect to Companion App! 😢');
            }
        });

        // Settings Tab
        this.addSettingTab(new RAGSettingsTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}