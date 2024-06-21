import { Card } from "@/components/ui/card";
import { Modal } from "@/app/@modal/(.)entries/modal";

export default function EntryBaseModal() {
    return (
        <Modal>
            <Card>
                Ehllo fro intercepted route base modal version
            </Card>
        </Modal>
    );
}